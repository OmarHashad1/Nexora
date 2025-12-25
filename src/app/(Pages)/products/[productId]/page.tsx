"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/APIs/Products/getProduct";
import { productsInterface } from "@/interfaces/products /products.interface";
import { Spinner } from "@/Components/ui/spinner";
import ProductDetailActions from "@/Components/ProductDetailActions/ProductDetailActions";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;

  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading, isError } = useQuery<{ data: productsInterface }>({
    queryKey: ["getProduct", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="container py-20 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="container py-8 text-center text-red-500">
        Error loading product
      </div>
    );
  }

  const product = data.data;
  const allImages = [product.imageCover, ...(product.images || [])];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <Star className="w-5 h-5 text-gray-600 absolute" />
            <div className="overflow-hidden w-2.5 absolute">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-600" />);
      }
    }
    return stars;
  };

  const discountPercentage = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100
      )
    : 0;

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square bg-white/5 rounded-[--radius] overflow-hidden">
            <Image
              src={allImages[selectedImage]}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
            />
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-[#f54927] text-white px-4 py-2 rounded-[calc(var(--radius)-0.25rem)] font-semibold text-sm shadow-lg z-10">
                -{discountPercentage}%
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white/5 rounded-md overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? "ring-2 ring-(--main) opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">{product.title}</h1>

          <div className="flex items-center gap-4 text-gray-400">
            <span className="text-(--main) font-medium">
              {product.category.name}
            </span>
            <span>•</span>
            <span>{product.brand.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1">{renderStars(product.ratingsAverage)}</div>
            <span className="text-white font-semibold">
              {product.ratingsAverage}
            </span>
            <span className="text-gray-400">
              ({product.ratingsQuantity} reviews)
            </span>
          </div>

          <div className="flex items-center gap-4 py-4">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-4xl font-bold text-(--main)">
                  EGP {product.priceAfterDiscount}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  EGP {product.price}
                </span>
              </>
            ) : (
              <span className="text-4xl font-bold text-white">
                EGP {product.price}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Description</h3>
            <p className="text-gray-400 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Availability:</span>
              <span
                className={`font-semibold ${
                  product.quantity > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            {product.quantity > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Quantity Available:</span>
                <span className="text-white font-semibold">{product.quantity}</span>
              </div>
            )}
          </div>

          <ProductDetailActions productId={productId} />

        </div>
      </div>
    </div>
  );
}
