import express from 'express';
import middlewareAuth from '../middleware/cartAuth.js';
import {
  placeOrder,
  verify,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  placeCodOrder,
  updateStoreStatus,
  deleteOrder
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', middlewareAuth, placeOrder);
orderRouter.post('/verify', middlewareAuth, verify);
orderRouter.get('/user-orders', middlewareAuth, getUserOrders);
orderRouter.get('/admin-orders', getAllOrders);
orderRouter.post('/update-order-status', updateOrderStatus);
orderRouter.post('/update-store-status', updateStoreStatus);
orderRouter.post('/place-cod', middlewareAuth, placeCodOrder);
orderRouter.post('/delete-order', deleteOrder);

export default orderRouter;
