import { addressResponseInterface } from "../address/addressResponse.interface";
import { CartInterface } from "../Cart/cart.interface";

export default interface CheckoutClientProps {
  cartId: string;
  addresses: addressResponseInterface | null;
  cart: CartInterface | null;
  error: string | null;
}
