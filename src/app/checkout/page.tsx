"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineHeart } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { PiTrash } from "react-icons/pi";
import { LiaCubeSolid } from "react-icons/lia";
// import { sendTelegramMessage } from "./api/message";
import { ToastContainer, toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { BsPlusSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [cards, setCards] = useState<any>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectedLikeIds, setSelectedLikeIds] = useState<number[]>([]);
  const [data, setData] = useState<any>([]);
  const [price, setPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [title, setTitle] = useState<any>("");
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const router = useRouter();
  const increment = (productId: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  const decrement = (productId: string) => {
    if (counts[productId] > 1) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: prevCounts[productId] - 1,
      }));
    }
  };
  useEffect(() => {
    const storedProductIds = JSON.parse(
      localStorage.getItem("selectedProductIds") || "[]"
    );
    setSelectedProductIds(storedProductIds);

    const storeLikeIds = JSON.parse(
      localStorage.getItem("selectedLikeIds") || "[]"
    );

    setSelectedLikeIds(storeLikeIds);
  }, []);
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(counts));
  }, [counts]);
  useEffect(() => {
    let totalPrice = 0;
    let allCount = 0;

    data.forEach((product: any) => {
      const count = counts[product.id] || 1;
      const price = product.price;
      const productPrice = count * price;
      totalPrice += productPrice;
      allCount += count;
      setTitle(product.title);
    });

    setCount(allCount);
    setPrice(totalPrice);
  }, [data, counts]);

  useEffect(() => {
    let cartIds: any = localStorage.getItem("cartId");
    if (cartIds) {
      setCards(JSON.parse(cartIds));
    }
  }, []);

  let allLikeId: any[] = [];

  const addLike = (evt: any) => {
    let getLikeId = localStorage.getItem("likeId");
    if (!getLikeId) {
      allLikeId = [evt];
    } else {
      allLikeId = JSON.parse(getLikeId);
      if (!allLikeId.includes(evt)) {
        allLikeId.push(evt);
      }
    }
    localStorage.setItem("likeId", JSON.stringify(allLikeId));
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchPromises = cards.map((i: any) =>
        fetch(`https://fakestoreapi.com/products/${i}`)
          .then((res) => res.json())
          .then((json) => json)
          .catch((err) => console.log(err))
      );

      try {
        let totalPrice = 0;
        const results = await Promise.all(fetchPromises);
        results.map((el: any) => (totalPrice += el.price));
        results.forEach((el: any) => {
          const count = (counts[el.id] || 1) * el.price;
          totalPrice += el.price * count;
        });

        setPrice(totalPrice);
        setData(results);
      } catch (err) {
        console.log(err);
      }
    };

    if (cards.length > 0) {
      fetchData();
    }
  }, [cards]);

  const deleteCart = (id: number) => {
    const updatedCards = cards.filter((cartId: number) => cartId !== id);
    setCards(updatedCards);
    localStorage.setItem("cartId", JSON.stringify(updatedCards));
    localStorage.setItem("selectedProductIds", JSON.stringify(updatedCards));
  };

  const sendTelegram = () => {
    const botToken = "6633867633:AAFc8HNujHnb36ISPc5XfzXO9O3rjfT8ew4";
    const chatId = "-1001848608431";
    const message = `Username: Ali\nProduct title: ${title},\nCount: ${count},\nPrice: ${price}$.`;
    // sendTelegramMessage({ botToken, chatId, message })
    // .then((success) => {
    //   if (success) {
    //     toast.success("Successfully Checkout");
    //   } else {
    //     toast.error("Empty");
    //   }
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
  };

  return (
    <div>
      <div className="bg-bgColor py-[12px]">
        <div className=" container mx-auto p-3 flex items-center ">
          <Link href="/" className="text-[16px] text-textColor font-normal">
            Home |
          </Link>
          <p className="capitalize text-[16px] text-mainColor ms-2 font-normal">
            Checkout
          </p>
        </div>
      </div>
      <div className="container mx-auto p-5">
        <div>
          <h1 className="font-normal text-[32px]">Checkout</h1>
          <p className="text-textColor text-[14px]">
            It will take some time and fill in the following information
          </p>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-5  mt-[30px]">
          <div className="  w-full lg:w-3/5 ">
            <div className="border-[1.5px] border-bgColor p-4 rounded-lg">
              <div>
                <div>
                  <p>User information</p>
                  <p className="text-[14px] text-textColor">
                    Please fill in all the information below
                  </p>
                </div>
                <div className="mt-5">
                  <form className="flex flex-wrap gap-2">
                    <div className="flex gap-2">
                      <div className="flex gap-3 flex-col">
                        <label className="text-[14px] text-textColor">
                          Nickname
                        </label>
                        <input
                          placeholder="Nickname"
                          type="text"
                          className="border w-full border-bgColor rounded-md outline-none px-2 py-1"
                        />
                      </div>
                      <div className="flex gap-3 flex-col">
                        <label className="text-[14px] text-textColor">
                          Name
                        </label>
                        <input
                          placeholder="Name"
                          type="text"
                          className="border w-full border-bgColor rounded-md outline-none px-2 py-1"
                        />
                      </div>
                      <div className="flex gap-3 flex-col">
                        <label className="text-[14px] text-textColor">
                          Last name
                        </label>
                        <input
                          placeholder="Last name"
                          type="text"
                          className="border w-full border-bgColor rounded-md outline-none px-2 py-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 flex-col">
                      <label className="text-[14px] text-textColor">
                        Phone Number
                      </label>
                      <input
                        placeholder="Phone Number"
                        type="text"
                        className="border w-full border-bgColor rounded-md outline-none px-2 py-1"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5  ">
            <div className="border border-bgColor rounded-md p-5">
              <p className="font-normal text-[16px] ">Order price</p>
              <div className="flex justify-between my-2 mt-5">
                <p className="font-normal text-textColor text-[12px]">
                  Product count
                </p>
                <p className="font-normal text-[16px]">{count}</p>
              </div>
              <div className="flex justify-between my-2">
                <p className="font-normal text-textColor text-[12px]">Price</p>
                <p className="font-normal text-[16px]">{price} so'm</p>
              </div>
              <div className="flex justify-between my-2">
                <p className="font-normal text-textColor text-[12px]">
                  Discount
                </p>
                <p className="font-normal text-[red] text-[16px]">
                  -{price} so'm
                </p>
              </div>
              <div className="flex justify-between my-2">
                <p className="font-normal text-textColor text-[12px]">
                  Delivery
                </p>
                <p className="font-normal text-[16px]">{0} so'm</p>
              </div>
              <hr />
              <div className="flex justify-between mt-2">
                <p className="font-normal text-textColor text-[12px]">
                  All price
                </p>
                <p className="font-normal text-[16px]">{price} so'm</p>
              </div>
              <button
                onClick={() => router.push("/payment")}
                className="bg-mainColor p-3 text-white w-full mt-3 rounded-md"
                // onClick={sendTelegram}
              >
                <ToastContainer />
                Checkout
              </button>
            </div>
            <div className="border border-bgColor bg-bgHelper rounded-md p-[16px] mt-3">
              Terms of delivery:
            </div>
            <div className="border border-bgColor rounded-md p-5 mt-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <BsTruck color="#6f7977" />
                  <p className="text-textColor text-[14px]">Delivery:</p>
                </div>
                <AiOutlineExclamationCircle style={{ color: "#6f7977" }} />
              </div>
              <p className="text-[14px]">
                Delivery start from 15 000 dollars across the city.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <LiaCubeSolid size={20} color="#6f7977" />
                  <p className="text-textColor text-[14px]">
                    <span className="text-mainColor font-semibold me-2">
                      Sello!
                    </span>
                    going to get through:
                  </p>
                </div>
                <AiOutlineExclamationCircle style={{ color: "#6f7977" }} />
              </div>
              <p className="text-[14px]">You can take our branch</p>
            </div>
            <div className="border border-bgColor flex items-center justify-between bg-bgHelper rounded-md p-[16px] mt-3">
              <p>Delivery country: uzbekistan</p>
              <AiOutlineExclamationCircle style={{ color: "#6f7977" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
