import React, { Dispatch, SetStateAction, createContext } from "react";

interface LikeContextInterface {
  like: number[];
  setLike: Dispatch<SetStateAction<number[]>>;
}

export const LikeContext = createContext<LikeContextInterface | undefined>(undefined);
