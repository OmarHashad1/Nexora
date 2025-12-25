export interface OrderItemProps {
  orderId: string;
  totalPrice: number;
  paymentMethod: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  itemsCount: number;
}
