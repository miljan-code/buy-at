import type { Product } from 'src/app/core/models/product.model';

export const siteConfig: SiteConfig = {
  title: 'BuyAt.store',
  categories: [],
  coverImage: 'src/assets/images/background-1.png',
  logo: '',
  favicon: '',
  products: [],
};

export interface SiteConfig {
  title: string;
  categories: Category[];
  coverImage: string;
  logo: string;
  favicon: string;
  products: Product[];
}

interface Category {
  label: string;
  path: string;
}
