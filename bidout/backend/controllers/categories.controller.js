import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';
import Category from '../models/Category.model.js';
import Product from '../models/Product.model.js';

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      title: req.body.title,
    });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists',
      });
    }

    let image = '';
    if (req.file) {
      let uploadedFile;
      try {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: 'Bidding/Categories',
          resource_type: 'image',
        });
      } catch (error) {
        res.status(500);
        throw new Error('Something went wrong while uploading the image');
      }

      image = uploadedFile.secure_url;
    }

    const newCategory = await Category.create({
      user: req.user._id,
      title: req.body.title,
      image,
    });

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
});

export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({})
      .sort({
        'title': 1,
      })
      .populate('user');

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
});

export const getCategoryDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const allCategory = await Category.find({
      title: 'all',
    });

    await Product.updateMany({ category: id }, { category: allCategory._id });

    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
});
