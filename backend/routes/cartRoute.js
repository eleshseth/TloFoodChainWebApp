import express from 'express';
import {
  addToCart,
  removeFromCart,
  getCart,
} from '../controllers/cartController.js';
import cartAuth from '../middleware/cartAuth.js';

const CartRouter = express.Router();

CartRouter.post('/add', cartAuth, addToCart);
CartRouter.post('/remove', cartAuth, removeFromCart);
CartRouter.post('/get', cartAuth, getCart);

export default CartRouter;
