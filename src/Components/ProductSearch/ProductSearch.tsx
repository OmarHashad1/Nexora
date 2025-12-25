"use client";

import { Input } from "@/Components/ui/input";
import { productsInterface } from "@/interfaces/products /products.interface";
import { useState, useMemo } from "react";
import ProductsGrid from "@/Components/ProductsGrid/ProductsGrid";

interface ProductSearchProps {
  products: productsInterface[];
}

export default function ProductSearch({ products }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(lowerSearchTerm) ||
        product.brand.name.toLowerCase().includes(lowerSearchTerm) ||
        product.category.name.toLowerCase().includes(lowerSearchTerm) ||
        product.description?.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }, [searchTerm, products]);

  return (
    <>
      <div className="my-10 w-[50%] mx-auto">
        <Input
          className="border-2 border-(--main)"
          placeholder="Search a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <p className="text-gray-400 text-sm mt-2 text-center">
            Found {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
      <ProductsGrid products={filteredProducts} />
    </>
  );
}
