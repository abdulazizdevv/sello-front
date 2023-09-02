"use client";
import { useState, useEffect } from "react";
import img1 from "../../../public/images/iPhone.png";
import Loading from "../../../public/loading.svg";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineExclamationCircle, AiOutlineHeart } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { PiTrash } from "react-icons/pi";
import { LiaCubeSolid } from "react-icons/lia";
import { ToastContainer, toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { BsPlusSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import { BASE_URL, BASE_URL_IMG } from "@/api/main";
type clickPrev = {
  clickHandler: any;
  hasPrev: any;
  label: any;
};
export default function SingleProduct() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((json) => setData(json));
  // }, []);

  useEffect(() => {
    const singleId = localStorage.getItem("singleId");
    if (singleId) {
      fetch(`${BASE_URL}/product/${singleId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setShow(true);
          }
          setLoading(false);
          setData([json.data]);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, []);
  let images = [1, 2, 3];
  const nextSlide = () => {
    setCurrentSlide((currentSlide) => {
      if (currentSlide === images.length - 1) {
        return 0;
      } else {
        return currentSlide + 1;
      }
    });
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide) => {
      if (currentSlide === 0) {
        return images.length - 1;
      } else {
        return currentSlide - 1;
      }
    });
  };
  // console.log(data);
  const renderTitle = (title: string) => {
    if (title.length > 15) {
      return title.substring(0, 15) + "...";
    }
    return title;
  };

  return (
    <div>
      {loading ? (
        <div className="text-center font-semibold text-[32px] h-screen">
          <Image
            style={{
              position: "absolute",
              top: "0px",
              bottom: "0px",
              right: "0px",
              left: "0px",
              margin: "auto",
              width: "200px",
              height: "200px",
            }}
            src={Loading}
            width={25}
            height={25}
            alt="load"
          />
        </div>
      ) : (
        show &&
        data && (
          <>
            <div>
              {data.map((el) => {
                return (
                  <>
                    <div className="bg-bgColor py-[12px]">
                      <div className=" container mx-auto p-3 flex items-center ">
                        <Link
                          href="/"
                          className="text-[16px] text-textColor font-normal"
                        >
                          Home |
                        </Link>
                        <p className="capitalize text-[16px] text-mainColor ms-2 font-normal">
                          {renderTitle(el.title)}
                        </p>
                      </div>
                    </div>
                    <div className="container mx-auto p-5">
                      <h2 className="font-normal  text-[28px] pb-5 max-w-[850px]">
                        {el.title}
                      </h2>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="flex container mx-auto p-5 flex-wrap lg:flex-nowrap gap-5">
              <div className="w-full md:w-2/3 relative">
                <Carousel
                  showArrows={true}
                  infiniteLoop={true}
                  autoPlay={false}
                  showStatus={false}
                  showIndicators={false}
                  // onChange={(currentSlide) => setCurrentSlide(currentSlide)}
                  selectedItem={currentSlide}
                >
                  {data.map((el: any) => {
                    return (
                      <>
                        <div className="container mb-5">
                          <div className="bg-bgColor">
                            <Image
                              src={`${BASE_URL_IMG}/${el.product_image}`}
                              width={150}
                              height={150}
                              alt="pic"
                              className="max-w-[350px] h-[400px]"
                              // style={{ width: "100%" }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="cursor-pointer">
                            <Image
                              className="demo  w-[128px]"
                              src={`${BASE_URL_IMG}/${el.product_image}`}
                              width={150}
                              height={150}
                              alt="The Woods"
                            />
                          </div>
                          <div className="cursor-pointer">
                            <Image
                              className="demo  w-[128px]"
                              src={`${BASE_URL_IMG}/${el.product_image}`}
                              width={150}
                              height={150}
                              alt="The Woods"
                            />
                          </div>
                          <div className="cursor-pointer">
                            <Image
                              className="demo  w-[128px]"
                              src={`${BASE_URL_IMG}/${el.product_image}`}
                              width={150}
                              height={150}
                              alt="The Woods"
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}
                </Carousel>
                <button
                  className="prev bg-mainColor absolute left-5 top-[30%] p-4 rounded-full"
                  onClick={prevSlide}
                >
                  <FiChevronLeft color="white" size={25} />
                </button>
                <button
                  className="next bg-mainColor  absolute top-[30%] right-5 p-4 rounded-full"
                  onClick={nextSlide}
                >
                  <FiChevronRight color="white" size={25} />
                </button>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="border border-bgColor rounded-md p-5">
                  <p className="font-normal text-[16px] ">Order price</p>
                  <div>
                    {data.map((el) => {
                      return (
                        <>
                          <p className="text-mainColor">{el.price} so'm</p>
                          <div className="flex gap-2 mt-5">
                            <p className="text-textColor">Brand:</p>
                            <p>{renderTitle(el.title)}</p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="bg-mainColor p-2 text-white w-full mt-3 rounded-lg"
                      // onClick={sendTelegram}
                    >
                      <ToastContainer />
                      Go to the ordering
                    </button>
                    <Link href="/payment" className="w-full">
                      <button
                        className="bg-mainColor p-2 text-white w-full mt-3 rounded-lg"
                        // onClick={sendTelegram}
                      >
                        <ToastContainer />
                        Payment
                      </button>
                    </Link>
                  </div>
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
                <div className="border border-bgColor bg-bgHelper rounded-md p-[16px] mt-3">
                  <p className="text-textColor text-[14px]">
                    1. Mahsulotlarni qaytarish:{" "}
                    <span className="text-black">Yo'q</span>
                  </p>
                  <p className="text-textColor text-[14px]">
                    2. Qadoqni ochish: <span className="text-black">Yo'q</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
