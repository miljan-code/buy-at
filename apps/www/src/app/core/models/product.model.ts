export interface Product {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  featured: boolean;
  price: number;
  category: string;
  quantity: number;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}
