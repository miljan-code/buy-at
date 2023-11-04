export interface Category {
  id: string;
  name: string;
  bilboard: string;
  slug: string;
  storeSlug: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCategoryOpts = Pick<
  Category,
  'name' | 'bilboard' | 'storeSlug'
>;

export type EditCategoryOpts = Pick<Category, 'id' | 'name' | 'bilboard'>;
