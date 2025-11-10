import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  userId: { type: String, required: true, unique:true},           // from Google OAuth user
  userEmail: { type: String, required:true, unique:true },
});

const User = models.User || model("User", UserSchema);
export default User;
