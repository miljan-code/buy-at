export const siteConfig: SiteConfig = {
  title: 'BuyAt.store',
  apiUrls: {
    auth: 'http://localhost:5000/api/auth',
    store: 'http://localhost:5000/api/store',
  },
};

export interface SiteConfig {
  title: string;
  apiUrls: ApiUrls;
}

interface ApiUrls {
  auth: string;
  store: string;
}

export interface NavLink {
  label: string;
  path: string;
}
