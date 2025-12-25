export default interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  category: {
    name: string;
  };
  imageCover: string;
  ratingsAverage: number;
}
