import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true }, // Add mobile field
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
});

const userModel = mongoose.models.users || mongoose.model('users', userSchema);
export default userModel;
