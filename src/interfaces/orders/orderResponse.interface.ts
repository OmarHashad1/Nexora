import { OrderInterface } from "./order.interface";

export interface OrderResponseInterface {
  results: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  status?: string;
  data: OrderInterface[];
}
