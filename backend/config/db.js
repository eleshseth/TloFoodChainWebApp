import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://eleshseth:Eleshseth@cluster0.sxo0k.mongodb.net/tlo-foodchain'
    )
    .then(() => console.log('db connected'));
};
