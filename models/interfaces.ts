export interface IUser {
  userId: string;
  userEmail: string;
}

export interface IStore {
  userId: string;
  shopName: string;
  shopDomain: string;
  encryptedToken: string;
  productData: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
