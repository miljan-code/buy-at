export interface Product {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  featured: boolean;
  price: number;
  category: string;
  quantity: number;
  storeSlug: string;
  createdAt: Date;
  updatedAt: Date;
}
