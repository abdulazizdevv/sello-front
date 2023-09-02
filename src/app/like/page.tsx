"use client";
import { BASE_URL, BASE_URL_IMG } from "@/api/main";
import { CartContext } from "@/context/cartContext";
import { LikeContext } from "@/context/likeContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { SlClose } from "react-icons/sl";

interface MapData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
}

export default function Like() {
  const { setLike }: any = useContext(LikeContext);
  const { setCart }: any = useContext(CartContext);

  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectedLikeIds, setSelectedLikeIds] = useState<number[]>([]);
  const [likes, setLikes] = useState<any>([]);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    let likeIds: any = localStorage.getItem("likeId");
    if (likeIds) {
      setLikes(JSON.parse(likeIds));
    }
  }, []);

  useEffect(() => {
    const storedProductIds = JSON.parse(
      localStorage.getItem("selectedProductIds") || "[]"
    );
    setSelectedProductIds(storedProductIds);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchPromises = likes.map((i: any) =>
        fetch(`${BASE_URL}/product/${i}`)
          .then((res) => res.json())
          .then((json) => {
            return json.data;
          })
          .catch((err) => console.log(err))
      );
      console.log(fetchData);
      try {
        const results = await Promise.all(fetchPromises);
        setData(results);
      } catch (err) {
        console.log(err);
      }
    };

    if (likes.length > 0) {
      fetchData();
    }
  }, [likes]);
  const renderTitle = (title: string) => {
    if (title.length > 50) {
      return title.substring(0, 50) + "...";
    }
    return title;
  };
  // const singleProduct = (evt: any) => {
  //   localStorage.setItem("singleId", JSON.stringify(evt));
  // };
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

  let allCartId;

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
    localStorage.setItem("cartId", JSON.stringify(allCartId));
    setCart(allCartId);
  };

  const deleteLike = (id: number) => {
    const updatedLikes = likes.filter((likeId: number) => likeId !== id);
    setLikes(updatedLikes);
    setLike(updatedLikes);
    localStorage.setItem("likeId", JSON.stringify(updatedLikes));
    localStorage.setItem("selectedLikeIds", JSON.stringify(updatedLikes));
  };

  return (
    <div className="container mx-auto p-5">
      <div>
        <div className=" container mx-auto p-3 flex items-center ">
          <Link href="/" className="text-[16px] text-textColor font-normal">
            Home |
          </Link>
          <p className="capitalize text-[16px] text-mainColor ms-2 font-normal">
            Favorites
          </p>
        </div>
        {likes.length !== 0 ? (
          <div className="flex   flex-wrap sm:justify-start justify-center">
            {data.map((el: any) => {
              return (
                <div key={el.id} className="p-2 max-w-[235px]">
                  <div className="bg-white rounded-md border flex flex-col justify-center border-[hsla(168,4%,45%,.16)] p-2">
                    <div className=" relative">
                      <div className="bg-[rgba(0,0,0,.16)] rounded-full  absolute right-0 top-2">
                        <button
                          className={`p-2 rounded-md `}
                          onClick={() => {
                            deleteLike(el.id);
                            handleLikeClick(el.id);
                          }}
                        >
                          <SlClose size={25} color={"white"} />
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
                      <h4 className="font-bold text-[16px]">{el.price} $</h4>
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
            })}
          </div>
        ) : (
          <h1 className="text-center font-semibold text-[25px]">
            Product not found
          </h1>
        )}
      </div>
    </div>
  );
}
