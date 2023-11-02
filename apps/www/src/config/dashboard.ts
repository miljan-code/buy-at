export const dashboardConfig = {
  navLinks: [
    {
      label: 'Home',
      path: '/',
      icon: 'pi pi-home',
    },
    {
      label: 'Categories',
      path: '/categories',
      icon: 'pi pi-table',
    },
    {
      label: 'Products',
      path: '/products',
      icon: 'pi pi-box',
    },
    {
      label: 'Customization',
      path: '/customization',
      icon: 'pi pi-wrench',
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
