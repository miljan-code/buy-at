export const siteConfig: SiteConfig = {
  title: 'BuyAt.store',
  apiUrls: {
    auth: 'http://localhost:5000/api/auth',
    store: 'http://localhost:5000/api/store',
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
}

export interface NavLink {
  label: string;
  path: string;
}
