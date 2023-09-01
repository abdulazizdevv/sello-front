"use client";
import { ToastContainer, toast } from "react-toastify";
import {
  AiOutlineBars,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsGlobeAmericas } from "react-icons/bs";
import { PiCameraRotate } from "react-icons/pi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { LuHome } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../public/icons/logo.svg";
import { useEffect, useState } from "react";
import Categories from "@/app/product";
import { CiMenuKebab } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { Modal } from "@/widgets/Modal/Modal";

function Navbar() {
  const pathname = usePathname();

  const [hovered, setHovered] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const [data, setData] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [likeId, setLikeId] = useState([]);
  const [countLike, setCountLikeId] = useState(0);
  const [countCart, setCountCartId] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    let cartIds: any = localStorage.getItem("cartId");
    if (cartIds) {
      setCartId(JSON.parse(cartIds));
    }
  }, []);

  useEffect(() => {
    let likeIds: any = localStorage.getItem("likeId");
    if (likeIds) {
      setLikeId(JSON.parse(likeIds));
    }
  }, []);

  useEffect(() => {
    setCountLikeId(likeId?.length);
    setCountCartId(cartId?.length);
  }, [cartId, likeId]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const handleSearch = (event: any) => {
    const value = event.target.value;
    const results: any = data.filter((product: any) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
    setShowSuggestions(true);
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: evt.target[0].value,
        password: evt.target[1].value,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          localStorage.setItem("token", json.token);
          location.reload();
          toast.success("Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("No information entered", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => console.log(err.message));
  };
  const handleClose = () => {
    setShowSuggestions(false);
  };

  const singleProduct = (evt: any) => {
    localStorage.setItem("singleId", JSON.stringify(evt));
  };

  // const toggleOffcanvas = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div>
      <div className="relative">
        <div className="py-4 container mx-auto p-5 flex   items-center justify-between">
          <Link href="/" className="">
            <Image src={Logo} width={140} height={50} alt="logo" />
          </Link>
          <div className="sm:w-3/5">
            <div className="lg:flex hidden  items-center ">
              <button
                onClick={() => setLoginModal(true)}
                className="flex me-5 gap-2 border border-[bgColor] rounded-md px-[6px] py-[7px] items-center text-[16px]"
              >
                <AiOutlineBars color={"#00B3A8"} size={24} />
                Catalog
              </button>
              <div className="w-full lg:flex hidden justify-between gap-3 items-center bg-white border border-[#eff1f0] rounded-l-md">
                <input
                  className="p-2 outline-none w-full"
                  placeholder="Search..."
                  type="search"
                  onChange={(event) => {
                    handleSearch(event);
                    const value = event.target.value.trim();
                    setShowSuggestions(value !== "");
                  }}
                />
              </div>
              <button className="text-white bg-mainColor p-2 px-[12px] rounded-r-lg hidden sm:flex">
                <AiOutlineSearch size={25} color={"#fff"} />
              </button>
            </div>
            <ul className=" absolute z-10 rounded-md py-2 bg-white px-3">
              {showSuggestions &&
                searchResults.map((product: any) => (
                  <li
                    key={product.id}
                    className="cursor-pointer hover:bg-slate-100"
                    onClick={() => {
                      singleProduct(product.id);
                      handleClose();
                    }}
                  >
                    <Link href="/singleproduct">{product.title}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex lg:hidden">
            <button>
              <AiOutlineBars size={24} color="#0FB7AD" />
            </button>
          </div>
          <div className="hidden items-center  gap-[40px] lg:flex">
            <Link href="/like">
              <button className="flex relative flex-col items-center">
                <p className="absolute right-[5px] top-[-12px] text-[14px] bg-[orange] rounded-[50%] px-[8px] text-white">
                  {countLike}
                </p>
                <AiOutlineHeart color="#00B3A8" size={24} />
                <p className="text-textColor">Favorites</p>
              </button>
            </Link>
            <Link href="/cart">
              <button className="flex relative flex-col items-center">
                <p className="absolute right-[-14px] top-[-14px] text-[14px] bg-[red] rounded-[50%] px-[7px] text-white">
                  {countCart}
                </p>
                <AiOutlineShoppingCart color="#00B3A8" size={24} />
                <p className="text-textColor">Cart</p>
              </button>
            </Link>
            <div className="dropdown">
              <Link href="/profile">
                <button
                  className="flex flex-col items-center "
                  onClick={() => setLoginModal(true)}
                >
                  <FaRegUser color="#00B3A8" size={24} />
                  <p className="text-textColor">Profile</p>
                </button>
              </Link>
              <div className="dropdown-content">{/* <Dropdown /> */}</div>
            </div>
          </div>
          <div className="flex lg:hidden justify-between container p-5 mx-auto bottom-0 fixed z-10 bg-white">
            <Link href="/">
              <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="flex hover:text-mainColor flex-col items-center"
              >
                <LuHome
                  size={24}
                  color={
                    hovered
                      ? "#00B3A8"
                      : "grey" && pathname === "/"
                      ? "#00B3A8"
                      : "grey"
                  }
                />
                <p className="text-[12px] text-textColor">Home</p>
              </button>
            </Link>
            <button
              onClick={() => setLoginModal(true)}
              onMouseEnter={() => setHovered1(true)}
              onMouseLeave={() => setHovered1(false)}
              className="flex hover:text-mainColor flex-col items-center"
            >
              <AiOutlineBars size={24} color={hovered1 ? "#00B3A8" : "grey"} />
              <p className="text-[12px] text-textColor">Catalog</p>
            </button>
            <Link href="/cart">
              <button
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
                className="flex hover:text-mainColor flex-col items-center"
              >
                <AiOutlineShoppingCart
                  size={24}
                  color={
                    (hovered2 ? "#00B3A8" : "grey") && pathname == "/cart"
                      ? "#00B3A8"
                      : "grey"
                  }
                />
                <p className="text-[12px] text-textColor">Cart</p>
              </button>
            </Link>
            <Link href="/like">
              <button
                onMouseEnter={() => setHovered3(true)}
                onMouseLeave={() => setHovered3(false)}
                className="flex hover:text-mainColor flex-col items-center"
              >
                <AiOutlineHeart
                  size={24}
                  color={
                    hovered3
                      ? "#00B3A8"
                      : "grey" && pathname == "/like"
                      ? "#00B3A8"
                      : "grey"
                  }
                />
                <p className="text-[12px] text-textColor">Favorites</p>
              </button>
            </Link>
            <button
              onMouseEnter={() => setHovered4(true)}
              onMouseLeave={() => setHovered4(false)}
              className="flex hover:text-mainColor flex-col items-center"
            >
              <CiMenuKebab size={24} color={hovered4 ? "#00B3A8" : "grey"} />
              <p className="text-[12px] text-textColor">Menu</p>
            </button>
          </div>
        </div>
        <hr />
        <div className="py-5">
          <Categories />
        </div>
      </div>
      <Modal modal={loginModal} setModal={setLoginModal}>
        {/* <div className=" md:p-5 "></div> */}
      </Modal>
    </div>
  );
}

export default Navbar;