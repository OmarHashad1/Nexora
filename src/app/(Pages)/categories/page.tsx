import { getAllCategories } from "@/APIs/Categories/getAllCategories";
import CategoriesGrid from "@/Components/CategoriesGrid/CategoriesGrid";
import { CategoriesInterface } from "@/interfaces/Categories/categories.interface";

export default async function Page() {
  let categories: { data: CategoriesInterface[] };

  try {
    categories = await getAllCategories();
  } catch (err) {
    console.log(err);
    return (
      <div className="container py-8 text-center text-red-500">
        Error loading categories
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="text-center mb-4">
        <h2 className="font-bold uppercase text-4xl relative group py-5">
          Our Categories
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-(--main)"></span>
        </h2>
      </div>

      <CategoriesGrid categories={categories?.data} />
    </div>
  );
}
