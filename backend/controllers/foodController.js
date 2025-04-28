import cloudinary from '../config/cloudinary.js';
import foodModel from '../models/foodmodel.js';

const addFood = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'first-time-use',
      transformation: [
        { width: 500, height: 500, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ],
      resource_type: 'auto'
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock, // Add stock field
      image: result.secure_url,
      cloudinary_id: result.public_id
    });

    const savedFood = await food.save();
    res.json({ 
      success: true, 
      message: 'food added',
      data: savedFood
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'error' });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id, name, price, category, description, stock } = req.body; // Add stock to destructuring
    
    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { name, price, category, description, stock }, // Add stock to update
      { new: true }
    );

    if (!updatedFood) {
      return res.json({ success: false, message: 'Food item not found' });
    }

    res.json({ 
      success: true, 
      message: 'Food item updated successfully',
      data: updatedFood 
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating food item' });
  }
};

const listFood = async (req, res) => {
  try {
    const food = await foodModel.find({});
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'error' });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    
    // Delete image from Cloudinary
    if (food.cloudinary_id) {
      await cloudinary.uploader.destroy(food.cloudinary_id);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'food removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

// const updateFood = async (req, res) => {
//   try {
//     const { id, name, price, category, description } = req.body;
    
//     const updatedFood = await foodModel.findByIdAndUpdate(
//       id,
//       { name, price, category, description },
//       { new: true }
//     );

//     if (!updatedFood) {
//       return res.json({ success: false, message: 'Food item not found' });
//     }

//     res.json({ 
//       success: true, 
//       message: 'Food item updated successfully',
//       data: updatedFood 
//     });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: 'Error updating food item' });
//   }
// };

export { addFood, listFood, removeFood, updateFood };
