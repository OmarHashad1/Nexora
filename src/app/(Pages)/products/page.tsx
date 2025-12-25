import React from "react";
import { getAllProducts } from "@/APIs/Products/getAllProducts";
import ProductsCarousel from "@/Components/ProductsCarousel/ProductsCarousel";
import ProductSearch from "@/Components/ProductSearch/ProductSearch";
import { productsInterface } from "@/interfaces/products /products.interface";

export default async function Page() {
  let products: { data: productsInterface[] };

  try {
    products = await getAllProducts();
  } catch (err) {
    console.log(err);
    return (
      <div className="container py-8 text-center text-red-500">
        Error loading products
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="text-center">
        <h2 className="font-bold uppercase text-4xl relative group py-5">
          Our Products
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-(--main) "></span>
        </h2>
      </div>
      <div className="my-10">
        <ProductsCarousel products={products?.data || []} />
      </div>
      <ProductSearch products={products?.data || []} />
    </div>
  );
}
