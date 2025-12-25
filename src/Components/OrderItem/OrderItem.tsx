import { OrderItemProps } from "@/interfaces/orders/orderItemProps.interface";
import { Package, CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";

export default function OrderItem({
  orderId,
  totalPrice,
  paymentMethod,
  isPaid,
  isDelivered,
  createdAt,
  itemsCount,
}: OrderItemProps) {
  const orderDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[#252525] border border-white/5 rounded-[--radius] p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-(--main)">
              Order #{orderId.slice(-8)}
            </h3>
            <p className="text-gray-400 text-sm">{orderDate}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Items:</span>
            <span className="text-white font-medium">{itemsCount}</span>
          </div>

          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Payment:</span>
            <span className="text-white font-medium capitalize">
              {paymentMethod}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isPaid ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-500 font-medium">Paid</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-500 font-medium">Not Paid</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isDelivered ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-500 font-medium">Delivered</span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500 font-medium">Processing</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
