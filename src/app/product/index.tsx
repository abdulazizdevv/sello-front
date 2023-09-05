"use client";
import { BASE_URL } from "@/api/main";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${BASE_URL}/catalog`)
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  return (
    <div className="flex justify-around gap-1">
      {data.map((el: any) => {
        return (
          <>
            <Link
              className={
                pathname === `/product/${el.catalog_name}`
                  ? " text-mainColor"
                  : "hover:text-mainColor text-[16px] md:text-[14px] rounded-lg"
              }
              href={`/product/${el.id}`}
            >
              {el.catalog_name}
            </Link>
          </>
        );
      })}
    </div>
  );
}
