"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import Loading from "../../../../public/loading.svg";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import "./main.css";
import { LikeContext } from "@/context/likeContext";
import { CartContext } from "@/context/cartContext";
import { BASE_URL, BASE_URL_IMG } from "@/api/main";

const mainData = [
  {
    title: "Apple",
    count: 455,
  },
  {
    title: "MacBook",
    count: 256,
  },
  {
    title: "Apple",
    count: 455,
  },
  {
    title: "Apple",
    count: 455,
  },
  {
    title: "Apple",
    count: 455,
  },
  {
    title: "Apple",
    count: 455,
  },
  {
    title: "Sony",
    count: 55,
  },
  {
    title: "Mi",
    count: 100,
  },
  {
    title: "Apple",
    count: 455,
  },
  {
    title: "Samsung",
    count: 455,
  },
  {
    title: "Honor",
    count: 455,
  },
  {
    title: "Huawei",
    count: 500,
  },
];

export default function Page({ params }: any) {
  const router = useRouter();

  const { like, setLike }: any = useContext(LikeContext);
  const { cart, setCart }: any = useContext(CartContext);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [selectedLikeIds, setSelectedLikeIds] = useState<number[]>([]);
  const [max, setMax] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const [brand, setBrand] = useState<any[]>([]);
  const [catalog, setCatalog] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [Categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${BASE_URL}/catalog/${params.slug}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data.products);
        setLoading(false);
      });
    fetch(`${BASE_URL}/catalog/${params.slug}`)
      .then((res) => res.json())
      .then((json) => {
        setBrand(json.data.brands);
        setLoading(false);
      });
    fetch(`${BASE_URL}/catalog`)
      .then((res) => res.json())
      .then((json) => {
        setCatalog(json.data);
        setLoading(false);
      });
    fetch(`${BASE_URL}/catalog/${params.slug}`)
      .then((res) => res.json())
      .then((json) => {
        setSubcategories(json.data.subcategories);
        setLoading(false);
      });
    fetch(`${BASE_URL}/catalog/${params.slug}`)
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.data.categories);
        setLoading(false);
      });
  }, []);
  const renderTitle = (title: string) => {
    if (title.length > 40) {
      return title.substring(0, 40) + "...";
    }
    return title;
  };

  const handleRangeChange = (value: any) => {
    setMax(value.target.value);
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

  const singleProduct = (evt: any) => {
    localStorage.setItem("singleId", JSON.stringify(evt));
  };

  let allCartId;
  let allLikeId;

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
    setLike(allLikeId);
    localStorage.setItem("likeId", JSON.stringify(allLikeId));
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
  const handleBrand = (evt: any) => {
    fetch(`${BASE_URL}/brand/${evt}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data.products);
        setLoading(false);
      });
  };
  const handleSub = (evt: any) => {
    const res = evt.target.value;

    if (res !== "all") {
      fetch(`${BASE_URL}/category/${+res}`)
        .then((res) => res.json())
        .then((json) => {
          setData(json.data.products);
          setLoading(false);
        });
    } else {
      fetch(`${BASE_URL}/catalog/${params.slug}`)
        .then((res) => res.json())
        .then((json) => {
          setData(json.data.products);
          setLoading(false);
        });
    }
  };
  const handleCatalog = (evt: any) => {
    const res = evt.target.value;
    console.log(res);
    router.push(`/product/${res}`);
    // fetch(`${BASE_URL}/catalog/${+res}`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setData(json.data);
    //     setLoading(false);
    //   });
  };
  // console.log(data);

  const categories = data.map((el: any) => {
    return (
      <div
        key={el.id}
        className=" w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2  "
      >
        <div className="bg-white rounded-md border flex flex-col justify-center border-[hsla(168,4%,45%,.16)] p-2">
          <div className=" relative">
            <div className="bg-[rgba(0,0,0,.16)] rounded-full  absolute right-0 top-2">
              <button
                className={`p-2 rounded-md `}
                onClick={() => {
                  addLike(el.id);
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
  });
  return (
    <>
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
        <div className="bg-bgColor">
          <div className="container mx-auto p-5">
            <div className="my-5 mb-6">
              <Link href="/" className=" text-[16px] text-textColor">
                Home | Category |
              </Link>
              <Link
                href={``}
                className="capitalize text-mainColor ms-1 text-grey"
              >
                {params.slug}
              </Link>
            </div>
            <div className=" flex md:flex-nowrap flex-wrap gap-2 ">
              <div className="w-full md:w-1/4">
                <div className=" bg-white p-2 h-[228px] rounded-lg">
                  <h3 className="font-semibold">Date</h3>
                  <p className="text-textColor">to</p>
                  <input
                    type="number"
                    placeholder="0"
                    className="border w-full p-2 focus:border-blue-400 outline-none border-textColor rounded-md"
                  />
                  <p className="text-textColor">from</p>
                  <input
                    type="number"
                    placeholder="30 000 000"
                    value={max}
                    className="border w-full p-2 focus:border-blue-400 outline-none border-textColor rounded-md"
                  />

                  <div className="range  mt-5">
                    <input
                      className="w-full"
                      type="range"
                      min={0}
                      defaultValue={0}
                      max={30000000}
                      value={max}
                      onChange={(value) => handleRangeChange(value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full  p-3 h-[228px] bg-white rounded-lg mt-4">
                    <h3 className="font-semibold pb-1">Brand</h3>
                    <div className="overflow-auto h-[180px] pb-1">
                      {brand.map((el) => {
                        return (
                          <>
                            <div className="flex justify-between me-3">
                              <div className="flex  items-center gap-1">
                                <input
                                  type="checkbox"
                                  onChange={() => handleBrand(el.id)}
                                />
                                <span className="text-textColor">
                                  {el.brand_name}
                                </span>
                              </div>
                              {/* <p className="text-textColor">{el.count}</p> */}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className=" p-3 h-[228px] bg-white rounded-lg mt-4">
                    <h3 className="font-semibold pb-1">Category</h3>
                    <div className="overflow-auto h-[180px] pb-1">
                      {subcategories.map((el) => {
                        return (
                          <>
                            <div className="flex justify-between me-3">
                              <div className="flex  items-center gap-1">
                                <input type="checkbox" />
                                <span className="text-textColor">
                                  {el.subcategory_name}
                                </span>
                              </div>
                              {/* <p className="text-textColor">{el.count}</p> */}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="p-3 h-[228px] bg-white rounded-lg mt-4">
                    <h3 className="font-semibold pb-1">Discount</h3>
                    <div className="overflow-auto h-[180px] pb-1">
                      {mainData.map((el) => {
                        return (
                          <>
                            <div className="flex justify-between me-3">
                              <div className="flex  items-center gap-1">
                                <input type="checkbox" />
                                <span className="text-textColor">
                                  {el.title}
                                </span>
                              </div>
                              <p className="text-textColor">{el.count}</p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/4">
                <div className="flex flex-wrap gap-5 ">
                  <select
                    name="filter"
                    className="outline-none rounded-md p-3 w-[200px] px-5 py-2 max-w-[268px]"
                  >
                    <option value="discount">Filter</option>
                    <option value="discount">discount</option>
                    <option value="discount">discount</option>
                    <option value="discount">discount</option>
                  </select>
                  <select
                    name="filter"
                    className="outline-none rounded-md p-3 w-[200px] px-5 py-2 max-w-[268px]"
                    onChange={handleCatalog}
                  >
                    <option value="discount">Catalog</option>
                    {catalog.map((el) => {
                      return (
                        <>
                          <option value={`${el.id}`}>{el.catalog_name}</option>
                        </>
                      );
                    })}
                  </select>
                  <select
                    name="filter"
                    className="outline-none rounded-md p-3 w-[200px] px-5 py-2 max-w-[268px]"
                    onChange={handleSub}
                  >
                    <option value="all">Subcategory</option>
                    {Categories.map((el) => {
                      return (
                        <>
                          <option value={`${el.id}`}>{el.category_name}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div className=" flex flex-wrap ">{categories}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
