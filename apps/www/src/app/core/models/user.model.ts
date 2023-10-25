import { Store } from './store.model';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  stores: Store[];
}
