import { getCategory } from "@/APIs/Categories/getCategory";
import { getSubCategory } from "@/APIs/Categories/getSubCategory";
import { CategoriesInterface } from "@/interfaces/Categories/categories.interface";
import { SubcategoryResponseInterface } from "@/interfaces/Categories/subcategory.interface";
import SubcategoryCard from "@/Components/SubcategoryCard/SubcategoryCard";
import Image from "next/image";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  let category: { data: CategoriesInterface };
  let subcategories: SubcategoryResponseInterface;

  try {
    [category, subcategories] = await Promise.all([
      getCategory({ categoryId }),
      getSubCategory({ categoryId }),
    ]);
  } catch (err) {
    console.log(err);
    return (
      <div className="container py-8 text-center text-red-500">
        Error loading category details
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="bg-[#252525] rounded-[--radius] border border-white/5 p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={category.data.image}
              alt={category.data.name}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-(--main) mb-2">
              {category.data.name}
            </h1>
            <p className="text-gray-400 text-lg mb-4">{category.data.slug}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
              <span>
                {subcategories.results} Subcategor
                {subcategories.results !== 1 ? "ies" : "y"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-6">Subcategories</h2>
      </div>

      {subcategories.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.data.map((subcategory) => (
            <SubcategoryCard
              key={subcategory._id}
              name={subcategory.name}
              slug={subcategory.slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#252525] rounded-[--radius] border border-white/5">
          <p className="text-gray-400 text-lg">
            No subcategories available for this category
          </p>
        </div>
      )}
    </div>
  );
}
