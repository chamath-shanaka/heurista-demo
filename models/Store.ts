import mongoose, { Schema, model, models } from "mongoose";

const StoreSchema = new Schema({
  userId: { type: String, required: true },
  shopName: { type: String, required: true },
  shopDomain: { type: String, required: true, unique: true },
  encryptedToken: { type: String, required: true },
  productData: { type: Object, default: {} },
}, { timestamps: true });

const Store = models.Store || model("Store", StoreSchema);
export default Store;
