"use client";
import BrandCard from "@/Components/BrandCard/BrandCard";
import { BrandsInterface } from "@/interfaces/Brands/brands.interface";

interface BrandsGridProps {
  brands: BrandsInterface[];
}

export default function BrandsGrid({ brands }: BrandsGridProps) {
  return (
    <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {brands?.map((brand: BrandsInterface) => (
        <BrandCard
          key={brand._id}
          id={brand._id}
          name={brand.name}
          slug={brand.slug}
          image={brand.image}
        />
      ))}
    </div>
  );
}
