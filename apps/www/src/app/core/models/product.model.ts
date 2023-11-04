export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
  price: number;
  category: string;
  quantity: number;
  storeSlug: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductOpts = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export type EditProductOpts = Omit<
  Product,
  'createdAt' | 'updatedAt' | 'storeSlug'
>;
