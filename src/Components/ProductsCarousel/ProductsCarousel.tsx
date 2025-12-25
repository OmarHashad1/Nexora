"use client";

import { Carousel } from "flowbite-react";
import Image from "next/image";
import { productsInterface } from "@/interfaces/products /products.interface";

interface ProductsCarouselProps {
  products: productsInterface[];
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const carouselProducts = products.slice(0, 5);

  return (
    <div className="h-96 rounded-[--radius] overflow-hidden">
      <Carousel
        slideInterval={3000}
        indicators={true}
        leftControl={
          <div className="w-10 h-10 bg-(--main) rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        }
        rightControl={
          <div className="w-10 h-10 bg-(--main) rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        }
      >
        {carouselProducts.map((product) => (
          <div
            key={product.id}
            className="relative h-full w-full bg-gradient-to-r from-[#252525] to-[#1a1a1a]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-2xl">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <h3 className="text-white text-2xl font-bold mb-2">
                {product.title}
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-(--main)">
                  ${product.price}
                </span>
                {product.priceAfterDiscount && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.priceAfterDiscount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
