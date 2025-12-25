
import AddressItemProps from "@/interfaces/address/addressItemProps.interface";
import AddressDeleteBtn from "../AddressDeleteBtn/AddressDeleteBtn";

export default function AddressItem({
  id,
  name,
  details,
  phone,
  city,
}: AddressItemProps) {
  return (
    <div className="bg-[#252525] border border-white/5 rounded-[--radius] p-6 flex justify-between items-start">
      <div className="space-y-3 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-(--main)">{name}</h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-gray-400 min-w-20">Details:</span>
            <span className="text-white">{details}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 min-w-20">Phone:</span>
            <span className="text-white">{phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 min-w-20">City:</span>
            <span className="text-white">{city}</span>
          </div>
        </div>
      </div>

      <AddressDeleteBtn addressId={id} />
    </div>
  );
}
