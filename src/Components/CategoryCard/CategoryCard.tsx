"use client";

import Image from "next/image";
import Link from "next/link";
import CategoryCardProps from "@/interfaces/Categories/categoryCardProps.interface";

export default function CategoryCard({ id, name, image }: CategoryCardProps) {
  return (
    <Link href={`/categories/${id}`}>
      <div className="cursor-pointer group relative bg-[#252525] rounded-[--radius] transition-all duration-300 border border-white/5 hover:border-(--main)/30 overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-white/5 flex items-center justify-center p-8">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-4 text-center bg-[#1a1a1a]">
          <h3 className="text-white font-semibold text-lg transition-colors duration-300 group-hover:text-(--main)">
            {name}
          </h3>
        </div>
        <div className="absolute inset-0 bg-(--main)/0 group-hover:bg-(--main)/5 transition-all duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
}
