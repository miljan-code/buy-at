export interface Store {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStoreOpts {
  storeName: string;
}
