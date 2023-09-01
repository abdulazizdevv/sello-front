import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Banner from "./Banner/Banner";

interface topChildren {
  children: any;
}

export default function Layout({ children }: topChildren) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="">{children}</div>
      <div className="bg-bgColor">
        <Banner />
      </div>
      <div className="bg-[#fff]">
        <Footer />
      </div>
    </div>
  );
}
