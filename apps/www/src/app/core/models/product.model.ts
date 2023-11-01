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

export type CreateProductOpts = Pick<
  Product,
  | 'name'
  | 'category'
  | 'description'
  | 'featured'
  | 'image'
  | 'price'
  | 'quantity'
  | 'storeSlug'
>;
