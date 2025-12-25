import ProductCard from "@/Components/ProductCard/productCard";
import { productsInterface } from "@/interfaces/products /products.interface";

interface ProductsGridProps {
  products: productsInterface[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product: productsInterface) => (
        <ProductCard
          key={product._id}
          id={product._id}
          title={product.title}
          description={product.description}
          price={product.price}
          priceAfterDiscount={product.priceAfterDiscount}
          category={product.category}
          imageCover={product.imageCover}
          ratingsAverage={product.ratingsAverage}
        />
      ))}
    </div>
  );
}
