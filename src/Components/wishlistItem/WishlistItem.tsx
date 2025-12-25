import Image from "next/image";
import { wishlistProps } from "@/interfaces/Wishlist/wishlistProps.interface";
import WishlistDeleteBtn from "../wishlistDeleteBtn/WishlistDeleteBtn";
import AddToCartBtn from "../addToCardBtn/AddToCartBtn";
import WishlistAddToCartBtn from "../addToCardBtn/WishlistAddToCartBtn";
function WishListItem({ id, title, brand, price, imageCover }: wishlistProps) {
  return (
    <div className="bg-[#252525] border border-white/5 rounded-[--radius] p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-white/5 rounded-md overflow-hidden shrink-0">
          <Image
            src={imageCover}
            width={80}
            height={80}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <p className="text-gray-400 text-sm">{brand}</p>
          <p className="text-(--main) font-bold text-xl">
            EGP {price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <WishlistAddToCartBtn productId={id}></WishlistAddToCartBtn>
        <WishlistDeleteBtn productId={id}></WishlistDeleteBtn>
      </div>
    </div>
  );
}

export default WishListItem;
