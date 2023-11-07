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
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductOpts = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'slug'
>;

export type EditProductOpts = Omit<
  Product,
  'createdAt' | 'updatedAt' | 'storeSlug' | 'slug'
>;
