import Image from "next/image";
import banner from "../../../public/images/banner12.png"

export default function Banner() {
  return <div className="container mx-auto py-[80px]">
    <Image src={banner} className="w-full rounded-lg" width={2000} height={100} alt="banner"/>
  </div>;
}
