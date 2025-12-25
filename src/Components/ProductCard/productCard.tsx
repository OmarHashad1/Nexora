import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import WishlistBtn from "../wishlistBtn/WishlistBtn";
import ProductCardProps from "@/interfaces/products /productCardProps.interface";
import AddToCartBtn from "../addToCardBtn/AddToCartBtn";

export default function ProductCard({
  id,
  title,
  description,
  price,
  priceAfterDiscount,
  category,
  imageCover,
  ratingsAverage,
}: ProductCardProps) {
  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const truncatedDescription =
    description.split(" ").slice(0, 8).join(" ") + "...";

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(ratingsAverage);
    const hasHalfStar = ratingsAverage % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-600 absolute" />
            <div className="overflow-hidden w-2 absolute">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-600" />);
      }
    }
    return stars;
  };

  return (
    <div
      className="group relative bg-[#252525] rounded-[--radius] transition-all duration-300
     border border-white/5 hover:border-[#f54927]/30"
    >
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden  bg-white/5">
          <Image
            src={imageCover}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-(--main) rounded-md text-white px-3 py-1 font-semibold text-sm z-10">
              -{discountPercentage}%
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <p className="text-(--main) text-sm font-medium">{category.name}</p>

          <h3 className="text-white font-semibold text-lg line-clamp-2 min-h-14">
            {title}
          </h3>

          <p className="text-gray-400 text-sm line-clamp-2 min-h-10">
            {truncatedDescription}
          </p>

          <div className="flex items-center gap-2 py-2">
            <div className="flex gap-1">{renderStars()}</div>
            <span className="text-sm text-gray-400">({ratingsAverage})</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            {priceAfterDiscount ? (
              <>
                <span className="text-2xl font-bold text-(--main)">
                  ${priceAfterDiscount}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-white">${price}</span>
            )}
          </div>
        </div>
      </Link>

      <WishlistBtn productId={id}></WishlistBtn>
      <AddToCartBtn productId={id} />
    </div>
  );
}
