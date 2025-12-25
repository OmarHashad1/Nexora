"use client";
import CategoryCard from "@/Components/CategoryCard/CategoryCard";
import { CategoriesInterface } from "@/interfaces/Categories/categories.interface";

interface CategoriesGridProps {
  categories: CategoriesInterface[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories?.map((category: CategoriesInterface) => (
        <CategoryCard
          key={category._id}
          id={category._id}
          name={category.name}
          slug={category.slug}
          image={category.image}
        />
      ))}
    </div>
  );
}
