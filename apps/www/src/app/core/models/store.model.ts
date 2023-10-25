export interface Store {
  id: string;
  storeName: string;
  slug: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStoreOpts {
  storeName: string;
}
