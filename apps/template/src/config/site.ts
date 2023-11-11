import type { Product } from '~core/models/product.model';
import type { Category } from '~core/models/category.model';

export const siteConfig: SiteConfig = {
  title: 'BuyAt.store',
  categories: [],
  coverImage: 'assets/images/background-1.png',
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
