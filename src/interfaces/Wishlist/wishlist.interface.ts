export interface WishlistInterface {
  status: 'success' | 'error';
  count: number;
  data: WishlistItem[];
}

export interface WishlistItem {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: WishlistCategory;
  brand: WishlistBrand;
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  images: string[];
  subcategory: WishlistSubcategory[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WishlistCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}