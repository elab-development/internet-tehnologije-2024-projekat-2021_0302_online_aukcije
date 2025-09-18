import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary';

import Product from '../models/Product.model.js';
import Category from '../models/Category.model.js';
import BiddingProduct from '../models/Bidding.model.js';

export const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    height,
    lengthPic,
    width,
    mediumUsed,
    weight,
  } = req.body;

  const userId = req.user.id;

  if (!title || !description || !price) {
    res.status(400);
    throw new Error('Fill all the required fields');
  }

  // Slug definition
  const originalSlug = slugify(title, {
    lower: true,
    remove: /[*=~.()'"!:@]/g,
    strict: true,
  });
  let slug = originalSlug;
  let suffix = 1;
  while (await Product.findOne({ slug })) {
    slug = `${originalSlug}-${suffix}`;
    suffix++;
  }

  // Image upload
  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Bidding/Product',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      throw new Error('Something went wrong while uploading the image');
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      public_id: uploadedFile.public_id,
    };
  }

  let categoryData = await Category.findById(category);
  if (!categoryData) {
    categoryData = await Category.findOne({
      name: 'all',
    });
  }

  const newProduct = await Product.create({
    user: userId,
    title,
    slug,
    description,
    price,
    category: categoryData._id,
    height,
    lengthPic,
    width,
    mediumUsed,
    weight,
    image: fileData,
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct,
  });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({
      'price': 1,
    })
    .populate('user')
    .populate('category');

  const productsWithBids = await Promise.all(
    products.map(async (product) => {
      const bids = await BiddingProduct.find({ product: product._id })
        .populate('user')
        .sort({
          'createdAt': -1,
        });
      return {
        ...product.toObject(),
        bids,
      };
    })
  );

  res.status(200).json({
    success: true,
    data: productsWithBids,
  });
});

export const getAllProductsFiltersQueries = asyncHandler(async (req, res) => {
  const { query, category, sort } = req.query;

  const filters = {};

  if (query) {
    filters.title = { $regex: query, $options: 'i' };
  }
  if (category) {
    const filterCategory = await Category.findOne({
      title: category,
    });
    if (filterCategory) {
      filters.category = filterCategory._id;
    }
  }
  let sortOption = { createdAt: -1 };
  if (sort === 'price-min-to-max') {
    sortOption = { price: 1 };
  } else if (sort === 'price-max-to-min') {
    sortOption = { price: -1 };
  }

  const products = await Product.find(filters)
    .sort(sortOption)
    .populate('user')
    .populate('category');

  const productsWithBids = await Promise.all(
    products.map(async (product) => {
      const bids = await BiddingProduct.find({ product: product._id })
        .populate('user')
        .sort({
          'createdAt': -1,
        });
      return {
        ...product.toObject(),
        bids,
      };
    })
  );

  res.status(200).json({
    success: true,
    data: productsWithBids,
  });
});

export const getVerifiedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    isSoldout: false,
    isVerified: true,
  })
    .sort({
      'price': 1,
    })
    .populate('user')
    .populate('category');

  const productsWithBids = await Promise.all(
    products.map(async (product) => {
      const bids = await BiddingProduct.find({ product: product._id })
        .populate('user')
        .sort({
          'createdAt': -1,
        });
      return {
        ...product.toObject(),
        bids,
      };
    })
  );

  res.status(200).json({
    success: true,
    data: productsWithBids,
  });
});

export const getSoldProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    isSoldout: true,
  })
    .populate('user')
    .populate('category');

  res.status(200).json({
    success: true,
    data: products,
  });
});

export const getProductsDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate('user')
    .populate('category');

  const bids = await BiddingProduct.find({ product: product._id })
    .populate('user')
    .sort({
      'createdAt': -1,
    });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json({
    success: true,
    data: {
      ...product.toObject(),
      bids,
    },
  });
});

export const getProductsDetailsBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug: slug })
    .populate('user')
    .populate('category');

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

export const getAllProductsOfLoggedInUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const products = await Product.find({ user: userId })
    .sort({ 'price': 1 })
    .populate('user')
    .populate('category');

  res.status(200).json({
    success: true,
    data: products,
  });
});

export const getProductsOfUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ user: id })
    .sort({ 'price': 1 })
    .populate('user')
    .populate('category');

  res.status(200).json({
    success: true,
    data: products,
  });
});

export const getWonProductsOfLoggedInUser = asyncHandler(async (req, res) => {
  const products = await Product.find({ soldTo: req.user._id })
    .sort({ 'price': 1 })
    .populate('user')
    .populate('category');

  res.status(200).json({
    success: true,
    data: products,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.user?.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized for this action');
  }

  let fileData = {};
  if (req.file) {
    let uploadedFile;
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Bidding/Product',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      throw new Error('Something went wrong while uploading the image');
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      public_id: uploadedFile.public_id,
    };
  }

  if (
    Object.keys(fileData).length > 0 &&
    product.image &&
    product.image.public_id
  ) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      await cloudinary.uploader.destroy(product.image.public_id);
    } catch (error) {
      res.status(500);
      throw new Error('Something went wrong while the products image');
    }
  }

  const {
    title,
    description,
    price,
    category,
    height,
    lengthPic,
    width,
    mediumUsed,
    weight,
  } = req.body;

  if (category) {
    const categoryData = await Category.findById(category);
    if (!categoryData) {
      res.status(404);
      throw new Error('Category not found');
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      title,
      description,
      price,
      category,
      height,
      lengthPic,
      width,
      mediumUsed,
      weight,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.user?.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized for this action');
  }

  if (product.image && product.image.public_id) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      await cloudinary.uploader.destroy(product.image.public_id);
    } catch (error) {
      res.status(500);
      throw new Error('Something went wrong while deleting the products image');
    }
  }

  await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

export const verifyAndAddCommission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { commission } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.isVerified = true;
  product.commission = commission;
  await product.save();

  res.status(200).json({
    success: true,
    message: 'Commission added successfully',
    data: product,
  });
});

export const deleteProductAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.image && product.image.public_id) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      await cloudinary.uploader.destroy(product.image.public_id);
    } catch (error) {
      res.status(500);
      throw new Error('Something went wrong while the deleting products image');
    }
  }

  await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});
