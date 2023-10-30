export interface Store {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStoreOpts {
  storeName: string;
}
