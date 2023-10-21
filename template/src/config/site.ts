export const siteConfig: SiteConfig = {
  title: 'BuyAt.store',
  navLinks: [],
  coverImage: 'src/assets/images/background-1.png',
};

export interface SiteConfig {
  title: string;
  navLinks: Array<NavLink>;
  coverImage: string;
}

interface NavLink {
  label: string;
  path: string;
}
