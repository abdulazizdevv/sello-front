"use client";

import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { LiaWalletSolid } from "react-icons/lia";
import { RxExit } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import profileImg from "../../../public/icons/profile-image.svg";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-wrap gap-5 md:flex-nowrap">
        <div className=" w-full md:w-1/3 border border-bgColor rounded-lg p-5">
          <div className="flex items-center gap-2 p-2 hover:bg-[#F1FCFB] cursor-pointer rounded-lg ">
            <FiUser size={24} color={"#6F7977"} />
            <p className="text-textColor ">Profile</p>
          </div>
          <Link href="/like">
            <div className="flex items-center gap-2 p-2 hover:bg-[#F1FCFB] cursor-pointer rounded-lg ">
              <AiOutlineHeart size={24} color={"#6F7977"} />
              <p className="text-textColor ">Favorites</p>
            </div>
          </Link>
          <Link href="/payment">
            <div className="flex items-center gap-2 p-2 hover:bg-[#F1FCFB] cursor-pointer rounded-lg ">
              <LiaWalletSolid size={24} color={"#6F7977"} />
              <p className="text-textColor ">Payment</p>
            </div>
          </Link>
          <div className="p-2 mt-10">
            <button className="flex items-center gap-3">
              <RxExit size={24} color="grey" />
              <p className="text-textColor hover:text-mainColor">Exit</p>
            </button>
          </div>
        </div>
        <div className=" w-full md:w-2/3 border border-bgColor rounded-lg p-5">
          <h1 className="text-[28px]">Personal information</h1>
          <p className="text-textColor ">
            This is where your personal information is stored. Click 'Edit' if
            you want to change your information.
          </p>
          <div className="flex gap-[100px] ms-[80px]">
            <Image src={profileImg} width={100} height={100} alt="pic" />
            <div>
              <div className="flex flex-wrap gap-[80px]">
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-textColor text-[14px]">Last Name</p>
                    <p>SSS</p>
                  </div>
                  <div>
                    <p className="text-textColor text-[14px]">Email</p>
                    <p>a@gmail.com</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-textColor text-[14px]">Phone Number</p>
                    <p>90123564</p>
                  </div>
                  <div>
                    <p className="text-textColor text-[14px]">Languages</p>
                    <p>English</p>
                  </div>
                </div>
              </div>
              <button className=" mt-9 bg-mainColor text-white p-2 px-6 float-right rounded-lg">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
