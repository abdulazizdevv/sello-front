"use client";
import { useState, useEffect } from "react";
import img1 from "../../../public/images/iPhone.png";
import Loading from "../../../public/loading.svg";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
      fetch(`https://fakestoreapi.com/products/${singleId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setShow(true);
          }
          setLoading(false);
          setData([json]);
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

  return (
    <div className="container mx-auto p-5">
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
                  <h2 className="font-normal text-[28px] pb-5 max-w-[720px]">
                    {el.title}
                  </h2>
                );
              })}
            </div>
            <div className="flex flex-wrap ">
              <div className="w-full md:max-w-[800px] me-8 relative">
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
                              src={el.image}
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
                              src={el.image}
                              width={150}
                              height={150}
                              alt="The Woods"
                            />
                          </div>
                          <div className="cursor-pointer">
                            <Image
                              className="demo  w-[128px]"
                              src={el.image}
                              width={150}
                              height={150}
                              alt="The Woods"
                            />
                          </div>
                          <div className="cursor-pointer">
                            <Image
                              className="demo  w-[128px]"
                              src={el.image}
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
              <div className="w-full md:w-1/3">
                <div className="border border-bgColor rounded-md p-5">
                  <p className="font-normal text-[16px] ">Order price</p>
                  <div className="flex justify-between my-2 mt-5">
                    <p className="font-normal text-textColor text-[12px]">
                      Product count
                    </p>
                    <p className="font-normal text-[16px]">ssss</p>
                  </div>
                  <div className="flex justify-between my-2">
                    <p className="font-normal text-textColor text-[12px]">
                      Price
                    </p>
                    <p className="font-normal text-[16px]">3131 so'm</p>
                  </div>
                  <div className="flex justify-between my-2">
                    <p className="font-normal text-textColor text-[12px]">
                      Discount
                    </p>
                    <p className="font-normal text-[red] text-[16px]">
                      -56651 so'm
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
                    <p className="font-normal text-[16px]">{6515} so'm</p>
                  </div>
                  {/* <button
                    onClick={() => router.push("/checkout")}
                    className="bg-mainColor p-3 text-white w-full mt-3 rounded-md"
                    // onClick={sendTelegram}
                  >
                    <ToastContainer />
                    Go to the ordering section
                  </button> */}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
