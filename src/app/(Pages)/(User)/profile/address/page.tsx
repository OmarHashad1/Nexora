import { getUserAddresses } from "@/APIs/Address/getUserAddresses";
import { addressResponseInterface } from "@/interfaces/address/addressResponse.interface";
import AddressManager from "@/Components/AddressManager/AddressManager";

export const dynamic = 'force-dynamic';

export default async function AddressPage() {
  let addresses: addressResponseInterface;

  try {
    addresses = await getUserAddresses();
  } catch (err) {
    console.log(err);
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Failed to load addresses</p>
      </div>
    );
  }

  return <AddressManager addresses={addresses?.data || []} />;
}
