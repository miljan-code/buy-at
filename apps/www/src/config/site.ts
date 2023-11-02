// TODO: refactor
export const siteConfig: SiteConfig = {
  title: 'BuyAt.store',
  apiUrls: {
    auth: 'http://localhost:5000/api/auth',
    store: 'http://localhost:5000/api/store',
    upload: 'http://localhost:5000/api/upload',
    product: 'http://localhost:5000/api/product',
    category: 'http://localhost:5000/api/category',
  },
  environment: 'development',
};

export interface SiteConfig {
  title: string;
  apiUrls: ApiUrls;
  environment: 'development' | 'production';
}

interface ApiUrls {
  auth: string;
  store: string;
  upload: string;
  product: string;
  category: string;
}

export interface NavLink {
  label: string;
  path: string;
}
