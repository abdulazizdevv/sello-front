"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  return (
    <div className="flex justify-around gap-1">
      <Link
        className={
          pathname === "/product/jewelery"
            ? " text-mainColor"
            : "hover:text-mainColor text-[16px] md:text-[14px] rounded-lg"
        }
        href="/product/jewelery"
      >
        Jewelery
      </Link>
      <Link
        className={
          pathname === "/product/electronics"
            ? " text-mainColor"
            : "hover:text-mainColor text-[16px] md:text-[14px] rounded-lg"
        }
        href="/product/electronics"
      >
        Electronics
      </Link>
      <Link
        className={
          pathname === "/product/men's%20clothing"
            ? " text-mainColor"
            : "hover:text-mainColor text-[16px] md:text-[14px] rounded-lg"
        }
        href="/product/men's clothing"
      >
        Mens clothing
      </Link>
      <Link
        className={
          pathname === "/product/women's%20clothing"
            ? " text-mainColor"
            : "hover:text-mainColor text-[16px] md:text-[14px] rounded-lg"
        }
        href="/product/women's clothing"
      >
        Womens clothing
      </Link>
    </div>
  );
}
