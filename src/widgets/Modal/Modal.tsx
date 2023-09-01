import React, { useEffect, useRef, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
// import "./modal.css"

interface ModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ modal, setModal, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [categoryData, setcategoryData] = useState<any[]>([]);
  const [categoryName, setCategory] = useState<string>("");
  const handleOverlay = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${categoryName}`
      );
      const data = await response.json();
      setcategoryData(data);
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
      <div className="main">
        <div className={` modal_wrapper pt-10 bg-white  w-full`}>
          <div className="container mx-auto">
            <div className="flex gap-[20px] flex-wrap">
              <div className="w-full  md:w-1/3">
                <div className="sidebar ">
                  {data.map((el: any) => {
                    return (
                      <>
                        <button
                          onClick={() => setCategory(el)}
                          className="text-textColor p-2 cursor-pointer hover:bg-[rgba(80,219,207,.08)] hover:text-black rounded-md w-full text-[14px] flex items-center justify-between"
                        >
                          {el} <BsChevronRight />
                        </button>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="line"></div>
              <div className="w-full md:w-3/5">
                <h1 className="font-semibold text-[25px] capitalize">{categoryName}</h1>
                {categoryData.map((el) => {
                  return (
                    <>
                      <div></div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className={`modal-content`}>{children}</div> */}
        </div>
      </div>
    </div>
  );
};
