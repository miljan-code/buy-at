export interface Store {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  coverImage: string | null;
  logo: string | null;
  favicon: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStoreOpts {
  storeName?: string;
  coverImage?: string | undefined;
}

export interface UpdateStoreOpts extends CreateStoreOpts {
  id: string;
  logo?: string | undefined;
  favicon?: string | undefined;
  slug?: string;
}
