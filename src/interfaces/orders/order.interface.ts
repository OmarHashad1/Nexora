export interface OrderInterface {
  _id: string;
  shippingAddress?: {
    details?: string;
    city?: string;
    phone?: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: CartItemOrder[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface CartItemOrder {
  count: number;
  _id: string;
  product: {
    subcategory: Array<{
      _id: string;
      name: string;
      slug: string;
      category: string;
    }>;
    ratingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    brand: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    ratingsAverage: number;
    id: string;
  };
  price: number;
}
