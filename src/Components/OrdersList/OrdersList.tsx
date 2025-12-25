import OrderItem from "@/Components/OrderItem/OrderItem";
import { OrderInterface } from "@/interfaces/orders/order.interface";

interface OrdersListProps {
  orders: OrderInterface[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderItem
              key={order._id}
              orderId={order._id}
              totalPrice={order.totalOrderPrice}
              paymentMethod={order.paymentMethodType}
              isPaid={order.isPaid}
              isDelivered={order.isDelivered}
              createdAt={order.createdAt}
              itemsCount={order.cartItems.length}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
