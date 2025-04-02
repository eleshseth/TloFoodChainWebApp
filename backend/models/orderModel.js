import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
  store: {
    type: String,
    required: true,
    default: 'Store 1',
  },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
  orderId: {
    type: String, // This will store Razorpay's order ID
    required: true,
  },
  paymentId: {
    type: String,
    required: false,
  },
});

const orderModel =
  mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
