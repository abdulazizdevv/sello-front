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
import Cookie from "js-cookie";
import Logo from "../../../public/icons/logo.svg";
import { useContext, useEffect, useState } from "react";
import Categories from "@/app/product";
import { CiMenuKebab } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { Modal } from "@/widgets/Modal/Modal";
import { CartContext } from "@/context/cartContext";
import { LikeContext } from "@/context/likeContext";
import { ProfileModal } from "@/widgets/Modal/ProfileModal";
import { VerifyModal } from "@/widgets/Modal/VerifyModal";
import { BASE_URL } from "@/api/main";

function Navbar() {
  const { cart }: any = useContext(CartContext);
  const { like }: any = useContext(LikeContext);
  const pathname = usePathname();

  const [hovered, setHovered] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [likeId, setLikeId] = useState([]);
  const [countLike, setCountLikeId] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [loginProfileModal, setLoginProfileModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);

  useEffect(() => {
    let likeIds: any = localStorage.getItem("likeId");
    if (likeIds) {
      setLikeId(JSON.parse(likeIds));
    }
  }, []);

  useEffect(() => {
    setCountLikeId(likeId?.length);
  }, [likeId]);

  useEffect(() => {
    fetch(`${BASE_URL}/product`)
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

  // console.log(cart.length);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    console.log(evt.target[2].value);

    fetch("http://10.10.1.25:3001/api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: evt.target[0].value,
        password: evt.target[1].value,
        phone_number: evt.target[2].value,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          toast.success("Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoginProfileModal(false);
          setVerifyModal(true);
        } else {
          toast.error("No information entered", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => console.log(err.message));
  };
  const handleSubmitVerify = (evt: any) => {
    evt.preventDefault();
    console.log(+evt.target[0].value);

    fetch("http://10.10.1.25:3001/api/auth/verify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        verifycode: +evt.target[0].value,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        if (json) {
          toast.success("Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          // setLoginProfileModal(false);
          // setVerifyModal(false);
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
            <ul className=" absolute z-[1] w-[350px] p-5 left-[30%] rounded-md py-2 bg-white px-3">
              {showSuggestions &&
                searchResults.map((product: any) => (
                  <Link href="/singleproduct">
                    <li
                      key={product.id}
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => {
                        singleProduct(product.id);
                        handleClose();
                      }}
                    >
                      {product.title}
                    </li>
                  </Link>
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
                  {like ? like.length : 0}
                </p>
                <AiOutlineHeart color="#00B3A8" size={24} />
                <p className="text-textColor">Favorites</p>
              </button>
            </Link>
            <Link href="/cart">
              <button className="flex relative flex-col items-center">
                <p className="absolute right-[-14px] top-[-14px] text-[14px] bg-[red] rounded-[50%] px-[7px] text-white">
                  {cart ? cart.length : 0}
                </p>
                <AiOutlineShoppingCart color="#00B3A8" size={24} />
                <p className="text-textColor">Cart</p>
              </button>
            </Link>
            <div className="dropdown">
              {/* <Link href="/profile"> */}
              <button
                className="flex flex-col items-center "
                onClick={() => setLoginProfileModal(true)}
              >
                <FaRegUser color="#00B3A8" size={24} />
                <p className="text-textColor">Profile</p>
              </button>
              {/* </Link> */}
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
      <ProfileModal
        width={"480px"}
        title={"Login"}
        modal={loginProfileModal}
        setModal={setLoginProfileModal}
      >
        <div className=" md:p-5 ">
          <form
            className="flex flex-col items-center gap-3 justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                className="w-full p-2 rounded-md outline-none border border-textColor"
                placeholder="Email"
                type="text"
                name="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                className="w-full p-2 rounded-md outline-none border border-textColor"
                placeholder="*****"
                type="password"
                name="password"
                id="phone"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                className="w-full p-2 rounded-md outline-none border border-textColor"
                placeholder="Phone number"
                type="tel"
                name="phoneNumber"
                id="phone"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-mainColor p-3 mt-3 text-white w-[200px]"
              >
                <ToastContainer />
                Log In
              </button>
            </div>
          </form>
        </div>
      </ProfileModal>
      <VerifyModal
        width={"480px"}
        title={"Verify"}
        modal={verifyModal}
        setModal={setVerifyModal}
      >
        <div className=" md:p-5 ">
          <form
            className="flex flex-col items-center gap-3 justify-center"
            onSubmit={handleSubmitVerify}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="text">Verify Code</label>
              <input
                className="w-full p-2 rounded-md outline-none border border-textColor"
                placeholder="*****"
                type="text"
                name="text"
                id="phone"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-mainColor p-3 mt-3 text-white w-[200px]"
              >
                <ToastContainer />
                Login
              </button>
            </div>
          </form>
        </div>
      </VerifyModal>
      <Modal modal={loginModal} setModal={setLoginModal}></Modal>
    </div>
  );
}

export default Navbar;
