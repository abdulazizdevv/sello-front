"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineHeart } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { PiTrash } from "react-icons/pi";
import { LiaCubeSolid } from "react-icons/lia";
import { ToastContainer, toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { BsPlusSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/cartContext";
import { LikeContext } from "@/context/likeContext";
import { BASE_URL, BASE_URL_IMG } from "@/api/main";

export default function Cart() {
  const { setCart }: any = useContext(CartContext);
  const { setLike }: any = useContext(LikeContext);
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
    setLike(allLikeId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchPromises = cards.map((i: any) =>
        fetch(`${BASE_URL}/product/${i}`)
          .then((res) => res.json())
          .then((json) => json.data)
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
  }, [cards.length]);
  const renderTitle = (title: string) => {
    if (title.length > 32) {
      return title.substring(0, 32) + "...";
    }
    return title;
  };
  const deleteCart = (id: number) => {
    const updatedCards = cards.filter((cartId: number) => cartId !== id);
    setCards(updatedCards);
    setCart(updatedCards);
    localStorage.setItem("cartId", JSON.stringify(updatedCards));
    localStorage.setItem("selectedProductIds", JSON.stringify(updatedCards));
  };
  const removeCartId = () => {
    localStorage.removeItem("cartId");
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
            Cart
          </p>
        </div>
      </div>
      <div className="container mx-auto p-5">
        {cards.length !== 0 ? (
          <div className="flex flex-wrap lg:flex-nowrap gap-5  mt-[30px]">
            <div className="  w-full lg:w-3/5   ">
              <div className="border-[1.5px] border-bgColor p-4 rounded-lg">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[28px]">Cart</h3>
                    <p className="p-[8px] text-textColor hidden md:block bg-[#F1FCFB] rounded-md">
                      Delivery is carried out by Sello Logistics
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center flex-wrap gap-5">
                      <div className="flex items-center gap-1">
                        <input type="checkbox" className="w-[20px] h-[20px] " />
                        <p className="text-mainColor">Select all</p>
                      </div>
                      <button
                        onClick={removeCartId}
                        className="text-[red] flex items-center "
                      >
                        <IoMdClose color={"red"} size={20} />
                        {1} delete
                      </button>
                    </div>
                    <p className="text-textColor ">{count} product</p>
                  </div>
                </div>
                {data.map((el: any) => (
                  <div key={el.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px] gap-3"
                    />
                    <div className="flex items-center border border-bgColor rounded-md p-5 flex-wrap justify-between gap-5 mt-5">
                      <div className="flex flex-wrap items-center gap-5">
                        <div className="bg-bgColor p-3 rounded-lg">
                          <Image
                            className="max-w-[100px] h-[108px]"
                            src={`${BASE_URL_IMG}/${el.product_image}`}
                            width={100}
                            height={50}
                            alt="pic"
                          />
                        </div>
                        <div>
                          <p className="max-w-[500px]">
                            {renderTitle(el.title)}
                          </p>
                          <p className="font-normal text-mainColor text-[18px] ">
                            {(counts[el.id] || 1) * el.price} so'm
                          </p>
                          <p className="text-textColor text-[14px]">
                            The country of delivery:
                            <span className="text-black text-[16px]">
                              Uzbekistan
                            </span>
                          </p>
                          <div className="flex mt-3 gap-5">
                            <button
                              className={`flex gap-1 items-center ${
                                selectedLikeIds.includes(el.id)
                                  ? "text-mainColor"
                                  : "text-textColor"
                              }`}
                              onClick={() => {
                                addLike(el.id);
                              }}
                            >
                              <AiOutlineHeart
                                size={25}
                                color={
                                  selectedLikeIds.includes(el.id)
                                    ? "#00b3a8"
                                    : "grey"
                                }
                              />
                              Favorites
                            </button>
                            <button
                              className="flex gap-1 text-[red] items-center"
                              onClick={() => deleteCart(el.id)}
                            >
                              <IoMdClose color={"red"} size={20} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-10">
                          <div className="flex gap-3 items-center ">
                            <button
                              className="font-semibold text-[30px]"
                              onClick={() => decrement(el.id)}
                            >
                              <CiSquareMinus color={"#00b3a8"} size={32} />
                            </button>
                            <p className="text-[18px] font-semibold text-mainColor">
                              {counts[el.id] || 1}
                            </p>
                            <button
                              className="font-semibold text-slate-400 text-[30px]"
                              onClick={() => increment(el.id)}
                            >
                              <CiSquarePlus color={"#00b3a8"} size={32} />
                            </button>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <p className="font-normal text-textColor text-[12px]">
                    Price
                  </p>
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
                  onClick={() => router.push("/checkout")}
                  className="bg-mainColor p-3 text-white w-full mt-3 rounded-md"
                  // onClick={sendTelegram}
                >
                  <ToastContainer />
                  Go to the ordering section
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
        ) : (
          <h1 className="text-center font-semibold text-[25px]">Carts empty</h1>
        )}
      </div>
    </div>
  );
}
