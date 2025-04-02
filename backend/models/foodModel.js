import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    cloudinary_id: { type: String, required: true }, // Add this field
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);
export default foodModel;
