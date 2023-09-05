import { BASE_URL } from "@/api/main";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { PiWalletLight } from "react-icons/pi";
import Location from "../../../public/icons/location.svg";
import { useRouter } from "next/navigation";

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResponsiveModal: React.FC<ModalProps> = ({ modal, setModal }) => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [categoryName, setCategory] = useState<string>("");
  const handleOverlay = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}/catalog`)
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${BASE_URL}/catalog/${categoryName}`);
      const data = await response.json();
      setCategoryData(data.data);
    }

    if (categoryName) {
      fetchData();
    }
  }, [categoryName]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className={`overlay  ${modal ? "open " : ""}`}
    >
      <div className="main_response">
        <div className={` modal_wrapper bg-white w-full`}>
          <div className="container mx-auto">
            <div className="flex gap-[20px] flex-wrap">
              <div className="w-full">
                <div className="flex items-center p-2 justify-between mt-[-75px] mb-[25px]">
                  <p>Menu</p>
                  <div className="flex gap-2">
                    <Image src={Location} width={12} height={12} alt="pic" />{" "}
                    Tashkent
                  </div>
                  <button
                    // className="p-3 float-right mt-[-75px]"
                    onClick={() => setModal(false)}
                  >
                    <IoMdClose color={"#00B3A8"} size={25} />
                  </button>
                </div>
                <div className="sidebar ">
                  <button
                    onClick={() => router.push("/profile")}
                    className="text-textColor p-2 py-4 cursor-pointer hover:bg-[rgba(80,219,207,.08)] hover:text-black rounded-md w-full text-[14px] flex items-center justify-between"
                  >
                    <p className="flex items-center gap-2">
                      <FiUser size={20} /> Profile
                    </p>
                    <BsChevronRight color={"#00B3A8"} />
                  </button>
                  <hr />
                  <button
                    onClick={() => router.push("/like")}
                    className="text-textColor p-2 py-4 cursor-pointer hover:bg-[rgba(80,219,207,.08)] hover:text-black rounded-md w-full text-[14px] flex items-center justify-between"
                  >
                    <p className="flex items-center gap-2">
                      <AiOutlineHeart size={20} /> Favorites
                    </p>
                    <BsChevronRight color={"#00B3A8"} />
                  </button>
                  <hr />
                  <button
                    onClick={() => router.push("/payment")}
                    className="text-textColor p-2 py-4 cursor-pointer hover:bg-[rgba(80,219,207,.08)] hover:text-black rounded-md w-full text-[14px] flex items-center justify-between"
                  >
                    <p className="flex items-center gap-2">
                      <PiWalletLight size={20} /> Payment
                    </p>
                    <BsChevronRight color={"#00B3A8"} />
                  </button>
                  <hr />
                  <button className="text-textColor p-2 py-4 cursor-pointer hover:bg-[rgba(80,219,207,.08)] hover:text-black rounded-md w-full text-[14px] flex items-center justify-between">
                    <p className="flex items-center gap-2">
                      <FiUser size={20} /> Profile
                    </p>
                    <BsChevronRight color={"#00B3A8"} />
                  </button>
                  <hr />

                  <div className="relative mt-5">
                    <Image
                      src={"https://sello.uz/images/test/test1.svg"}
                      width={150}
                      height={150}
                      className="w-[100%] rounded-2xl "
                      alt="pic"
                    />
                    <p className="absolute top-0 z-10 text-white p-5 text-[22px]">
                      Sello Marketpleysida sotishni boshlang
                    </p>
                    <button className="bg-[#F0CE60] rounded-lg p-2 absolute bottom-3 left-4">
                      Ariza qoldirish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
