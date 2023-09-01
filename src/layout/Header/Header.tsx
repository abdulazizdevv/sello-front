"use client"
import Image from "next/image";

import Link from "next/link";

import LocationImg from "../../../public/icons/location.svg";
import modalLocation from "../../../public/icons/modalLocation.svg";
import Logo from "../../../public/icons/logo.svg";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 3) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="bg-[#DDF4F2] sm:bg-bgColor">
        <div className="container mx-auto pt-3 pb-3 ">
          <div className="flex justify-between ">
            <Link href="/" className="flex sm:hidden items-center gap-1">
              <Image src={Logo} width={80} height={50} alt="logo" />
              <p className="text-[12px]">Open app</p>
            </Link>
            <div className="flex justify-between sm:hidden">
              <div className="flex gap-5 text-slate-500	">
                <Link href="https://play.google.com/store/apps/details?id=com.tune.sello&pli=1">
                  <button className=" px-3 text-[14px] py-1 bg-mainColor rounded-lg text-white">
                    Open
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden justify-between lg:flex">
            <div className="flex gap-5 font-semibold">
              <div className="flex ">
                <button className="bg-mainColor text-white py-[4.8px] px-[24px] text-[14px] rounded-lg">
                  Sello markets
                </button>
              </div>
            </div>
            <div className="flex items-center gap-5 text-slate-500	">
              <button className="bg-mainColor text-white py-[4.8px] px-[8px] text-[14px] rounded-lg">
                Sello-da sotish
              </button>
              <select className="hover:text-mainColor cursor-pointer bg-bgColor outline-none">
                <option value="En">Eng</option>
                <option value="uz">Uzb</option>
              </select>
              <button className="cursor-pointer hover:text-mainColor text-[14px] flex items-center gap-1">
                <Image
                  src={LocationImg}
                  alt="location"
                  width={12}
                  height={12}
                />
                Tashkent
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${isScrolled ? "fixed top-0 z-10 transition" : "relative"} w-full bg-white`}
      >
        <Navbar />
      </div>
    </>
  );
}
