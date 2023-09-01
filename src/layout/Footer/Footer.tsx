import Link from "next/link";
import React from "react";
import Image from "next/image";

import { RiFacebookFill } from "react-icons/ri";

import logo from "../../../public/icons/logo.svg";
import selloPay from "../../../public/icons/sellopay.svg";
import Zoomrad from "../../../public/icons/zoomrad.svg";
import Humo from "../../../public/icons/humo.svg";
import Uzcard from "../../../public/icons/uzcard.svg";
import appGallery from "../../../public/icons/appgallery.svg";
import google from "../../../public/icons/google.svg";
import appStore from "../../../public/icons/appStore.svg";
import Iphone from "../../../public/images/iPhone.png";

import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <div className=" mt-[100px] flex flex-wrap justify-between container mx-auto p-5">
      <div>
        <Image src={logo} width={200} height={200} alt="logo" />
        <p className="text-textColor">© 2022 OOO «Marketplace Trading»</p>
        <p className="mt-[20px]">Tolov tizimlari</p>
        <div className="flex flex-wrap mt-3 gap-3">
          <div className="gap-3 flex flex-col">
            <div className="p-[8px] py-[17px] rounded-md border border-bgColor ">
              <Image src={selloPay} width={92} height={34} alt="pay" />
            </div>
            <div className="p-[8px] py-[17px] rounded-md border border-bgColor ">
              <Image src={Zoomrad} width={92} height={34} alt="pay" />
            </div>
          </div>
          <div className="gap-3 flex flex-col">
            <div className="p-[8px] py-[10px] rounded-md border border-bgColor ">
              <Image
                src={Humo}
                style={{ width: "92px", height: "32px" }}
                width={92}
                height={34}
                alt="pay"
              />
            </div>
            <div className="p-[8px] py-[10px] rounded-md border border-bgColor ">
              <Image
                src={Uzcard}
                style={{ width: "92px", height: "32px" }}
                width={92}
                height={34}
                alt="pay"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h3>Nima uchun bizni tanlashadi</h3>
        <Link href="/payment">
          <p className="text-textColor hover:text-mainColor">Payment</p>
        </Link>
        <Link href="/page/delivery">
          <p className="text-textColor hover:text-mainColor">Delivery</p>
        </Link>
        <Link href="/page/return-exchange">
          <p className="text-textColor hover:text-mainColor">Return exchange</p>
        </Link>
        <Link href="/page/requisite">
          <p className="text-textColor hover:text-mainColor">Requisite</p>
        </Link>
        <Link href="/page/app">
          <p className="text-textColor hover:text-mainColor">Apps</p>
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <h3>Kompaniya haqida</h3>
        <Link href="/page/about">
          <p className="text-textColor hover:text-mainColor">About</p>
        </Link>
        <Link href="/page/contact">
          <p className="text-textColor hover:text-mainColor">Contact</p>
        </Link>
        <Link href="/page/return-exchange">
          <p className="text-textColor hover:text-mainColor">Return exchange</p>
        </Link>
        <Link href="/page/requisite">
          <p className="text-textColor hover:text-mainColor">Requisite</p>
        </Link>
        <Link href="/page/app">
          <p className="text-textColor hover:text-mainColor">Apps</p>
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <h3>Aloqa</h3>
        <div>
          <p className="text-textColor hover:text-mainColor">Give us a call</p>
          <a href="tel:+998781130900" className="text-mainColor">
            +998 (78) 113 09 00
          </a>
        </div>
        <div>
          <p className="text-textColor hover:text-mainColor">Write to us:</p>
          <a href="http://support@sello.uz" className="text-mainColor">
            support@sello.uz
          </a>
        </div>
        <div>
          <p className="text-textColor hover:text-mainColor">Write to us:</p>
          <a href="http://support@sello.uz" className="text-mainColor">
            support@sello.uz
          </a>
        </div>
        <div>
          <p className="font-semibold ">Social networks:</p>
          <div className="flex justify-between">
            <Link
              href="https://www.facebook.com/sello.uz"
              className="p-3 rounded-[50%] border border-bgColor"
            >
              <RiFacebookFill color="#6f7977" size={20} />
            </Link>
            <Link
              href="https://t.me/sellouz"
              className="p-3 rounded-[50%] border border-bgColor"
            >
              <FaTelegramPlane color="#6f7977" size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/sello.uzbekistan/"
              className="p-3 rounded-[50%] border border-bgColor"
            >
              <FaInstagram color="#6f7977" size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h3>Download app</h3>
        <div className="flex flex-wrap gap-3">
          <Image src={google} width={109} height={34} alt="store" />
          <Image src={google} width={109} height={34} alt="store" />
        </div>
        <Image
          className="bg-black p-2"
          src={appGallery}
          width={109}
          height={34}
          alt="store"
        />
        <div>
          <Image src={Iphone} width={230} height={180} alt="phone" />
        </div>
      </div>
    </div>
  );
}
