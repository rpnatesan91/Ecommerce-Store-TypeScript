export interface Data {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category: {
    creationAt: string;
    id: number;
    image: string;
    name: string;
    updatedAt: string;
  };
  images?: string[];
  cart: number;
} //? - Optional property
