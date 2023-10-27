export const dashboardConfig = {
  navLinks: [
    {
      label: 'Home',
      path: '/',
      icon: 'pi pi-home',
    },
    {
      label: 'Products',
      path: '/products',
      icon: 'pi pi-box',
    },
  ],
} satisfies DashboardConfig;

export interface DashboardLink {
  label: string;
  path: string;
  icon: string;
}

interface DashboardConfig {
  navLinks: DashboardLink[];
}
