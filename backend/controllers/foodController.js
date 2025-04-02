import cloudinary from '../config/cloudinary.js';
import foodModel from '../models/foodModel.js';

const addFood = async (req, res) => {
  try {
    // Upload image to Cloudinary with optimized settings
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
      image: result.secure_url,
      cloudinary_id: result.public_id
    });

    const savedFood = await food.save();
    res.json({ 
      success: true, 
      message: 'food added',
      data: savedFood // Return the saved food data including image URL
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'error' });
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

export { addFood, listFood, removeFood };
