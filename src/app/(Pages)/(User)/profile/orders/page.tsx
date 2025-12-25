import { getUserOrders } from "@/APIs/orders/getUserOrders";
import { OrderResponseInterface } from "@/interfaces/orders/orderResponse.interface";
import OrdersList from "@/Components/OrdersList/OrdersList";

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  let orders: OrderResponseInterface;

  try {
    console.log("OrdersPage: Calling getUserOrders");
    orders = await getUserOrders();
    console.log("OrdersPage: Got orders", orders);
  } catch (err) {
    console.error("OrdersPage: Error loading orders", err);
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Failed to load orders</p>
        <p className="text-gray-400 text-sm mt-2">{err instanceof Error ? err.message : "Unknown error"}</p>
      </div>
    );
  }

  return <OrdersList orders={orders?.data || []} />;
}
