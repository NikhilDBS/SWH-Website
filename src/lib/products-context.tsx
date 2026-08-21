"use client";
import { createContext, useContext } from "react";
import type { Product } from "./products";

const ProductsContext = createContext<Product[]>([]);

export const ProductsProvider = ProductsContext.Provider;

export function useProducts(): Product[] {
  return useContext(ProductsContext);
}
