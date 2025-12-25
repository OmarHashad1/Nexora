import { getAllBrands } from "@/APIs/Brands/getAllBrands";
import BrandsGrid from "@/Components/BrandsGrid/BrandsGrid";
import { BrandsInterface } from "@/interfaces/Brands/brands.interface";

export const dynamic = 'force-dynamic';

export default async function Page() {
  let brands: { data: BrandsInterface[] };

  try {
    brands = await getAllBrands();
  } catch (err) {
    console.log(err);
    return (
      <div className="container py-8 text-center text-red-500">
        Error loading brands
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="text-center mb-4">
        <h2 className="font-bold uppercase text-4xl relative group py-5">
          Our Brands
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-(--main)"></span>
        </h2>
      </div>
     
      <BrandsGrid brands={brands?.data} />
    </div>
  );
}
