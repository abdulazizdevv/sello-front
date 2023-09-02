import React, { Dispatch, SetStateAction, createContext } from "react";

interface CartContextInterface {
  cart: number[];
  setCart: Dispatch<SetStateAction<number[]>>;
}

export const CartContext = createContext<CartContextInterface | undefined>(undefined);
