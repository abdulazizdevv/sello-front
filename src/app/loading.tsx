import Image from "next/image";
import Loadings from "../../public/loading.svg";

export default function Loading() {
  return (
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
        src={Loadings}
        width={25}
        height={25}
        alt="load"
      />
    </div>
  );
}
