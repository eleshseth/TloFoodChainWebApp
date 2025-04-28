import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js';
import CartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import adminRouter from './routes/adminRoute.js';

//app config
const app = express();
const PORT = 8003;

//middlewares
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', CartRouter);
app.use('/api/order', orderRouter);
app.use('/api/admin', adminRouter);
app.get('/', (req, res) => {
  res.send('API working ');
});

app.listen(PORT, () => {
  console.log('the server is starte  on the port 3004');
});
