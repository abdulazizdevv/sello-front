import { useState } from "react";

export async function getPostIdList() {
  const data = await fetch(`https://fakestoreapi.com/products/categories`);
  const res = await data.json();
  return res.map((post: any) => {
    return {
      params: {
        slug: post,
      },
    };
  });
}

export async function getPostDetails(postId: string) {
  const data = await fetch(
    `https://fakestoreapi.com/products/category/${postId}`
  );
  const res = await data.json();
  return res;
}
export async function getServerSideProps({ params }: any) {
  const data = await fetch(
    `https://fakestoreapi.com/products/category/${params.slug}`
  );
  const res = await data.json();
  return {
    props: {
      res,
    },
  };
}
