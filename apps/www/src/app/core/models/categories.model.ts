export interface Attribute {
  id: string;
  name: string;
  categoryId: string;
  storeSlug: string;
  options: Option[];
}

export interface Option {
  id: string;
  name: string;
  attributeId: string;
}

export interface Category {
  id: string;
  name: string;
  bilboard: string;
  slug: string;
  storeSlug: string;
  createdAt: Date;
  updatedAt: Date;
  attributes: Attribute[];
}

export type CreateCategoryOpts = Pick<
  Category,
  'name' | 'bilboard' | 'storeSlug'
>;

export type EditCategoryOpts = Pick<Category, 'id' | 'name' | 'bilboard'>;
