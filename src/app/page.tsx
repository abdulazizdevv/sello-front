"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import Loading from "../../public/loading.svg";
import Banner from "@/layout/Banner/Banner";
import { BASE_URL, BASE_URL_IMG } from "@/api/main";
import { CartContext } from "@/context/cartContext";
import { LikeContext } from "@/context/likeContext";

export default function Home() {
  const { setCart }: any = useContext(CartContext);
  const { setLike }: any = useContext(LikeContext);

  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectedLikeIds, setSelectedLikeIds] = useState<number[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${BASE_URL}/product`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);
  const renderTitle = (title: string) => {
    if (title.length > 50) {
      return title.substring(0, 50) + "...";
    }
    return title;
  };
  let allCartId: any;
  let allLikeId: any;

  const addToCart = (evt: any) => {
    let getCartId: any = localStorage.getItem("cartId");
    if (!getCartId) {
      allCartId = [evt];
    } else {
      allCartId = JSON.parse(getCartId);
      if (!allCartId.includes(evt)) {
        allCartId.push(evt);
      }
    }
    setCart(allCartId);
    localStorage.setItem("cartId", JSON.stringify(allCartId));
  };
  const addToLike = (evt: any) => {
    let getCartId: any = localStorage.getItem("likeId");
    if (!getCartId) {
      allLikeId = [evt];
    } else {
      allLikeId = JSON.parse(getCartId);
      if (!allLikeId.includes(evt)) {
        allLikeId.push(evt);
      }
    }
    setLike(allLikeId);
    localStorage.setItem("likeId", JSON.stringify(allLikeId));
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
  const handleProductClick = (id: number) => {
    if (!selectedProductIds.includes(id)) {
      const updatedProductIds = [...selectedProductIds, id];
      setSelectedProductIds(updatedProductIds);
      localStorage.setItem(
        "selectedProductIds",
        JSON.stringify(updatedProductIds)
      );
    }
  };
  const handleLikeClick = (id: number) => {
    if (!selectedLikeIds.includes(id)) {
      const updatedProductIds = [...selectedLikeIds, id];
      setSelectedLikeIds(updatedProductIds);
      localStorage.setItem(
        "selectedLikeIds",
        JSON.stringify(updatedProductIds)
      );
    }
  };

  const jewelerys = data.map((el: any) => {
    // const isSelected = selectedProductIds.includes(el.id);
    // const isSelectedLike = selectedLikeIds.includes(el.id);
    return (
      <div
        key={el.id}
        onClick={() => localStorage.setItem("singleId", el.id)}
        className=" w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2  "
      >
        <div className="bg-white rounded-md border flex flex-col justify-center border-[hsla(168,4%,45%,.16)] p-2">
          <div className=" relative">
            <div className="bg-[rgba(0,0,0,.16)] rounded-full  absolute right-0 top-2">
              <button
                className={`p-2 rounded-md `}
                onClick={() => {
                  addToLike(el.id);
                  handleLikeClick(el.id);
                }}
              >
                <AiOutlineHeart
                  size={25}
                  color={`${
                    selectedLikeIds.includes(el.id) ? "#00B3A8" : "white"
                  }`}
                />
              </button>
            </div>
            <Link href="/singleproduct">
              <Image
                className="block w-[180px] h-[180px]"
                src={`${BASE_URL_IMG}/${el.product_image}`}
                width={"183"}
                height={"198"}
                alt="card"
              />
            </Link>
          </div>
          <Link href="/singleproduct">
            <p className="my-2 text-[14px] h-[70px] max-w-[185px]">
              {renderTitle(el.title)}
            </p>
            <h4 className="font-bold text-[16px]">{el.price} so'm</h4>
          </Link>
          <div className="flex mt-5 sm:justify-between gap-2">
            <button
              className={`p-1  rounded-md w-full text-center flex justify-center text-[14px] items-center gap-3 ${
                selectedProductIds.includes(el.id)
                  ? "text-black bg-white border border-mainColor "
                  : "bg-mainColor text-white"
              }`}
              onClick={() => {
                addToCart(el.id);
                handleProductClick(el.id);
              }}
            >
              Add to Card
            </button>
          </div>
        </div>
      </div>
    );
  });
  return (
    <main className="container mx-auto p-5">
      {loading ? (
        <div className="h-screen">
          <Image
            style={{
              position: "absolute",
              top: "10px",
              bottom: "0px",
              right: "0px",
              left: "0px",
              margin: "auto",
              width: "250px",
              height: "250px",
            }}
            src={Loading}
            width={25}
            height={25}
            alt="load"
          />
        </div>
      ) : (
        <>
          <div className="flex  flex-wrap">{jewelerys}</div>
        </>
      )}
    </main>
  );
}
