export interface addressResponseInterface {
  results: number;
  status: string;
  data: addressInfo[];
}

export interface addressInfo {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
