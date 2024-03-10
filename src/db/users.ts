import mongoose from "mongoose";

 const UserSchema = new mongoose.Schema({
    fUserId: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  });

 export const UserModel = mongoose.model("User", UserSchema);

 export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
 export const getUserByEmail = (email: string) => UserModel.findOne({ email });
 export const getUserEmailsByUid = (userIds: string[]) => UserModel.find({ _id: { $in: userIds } });
