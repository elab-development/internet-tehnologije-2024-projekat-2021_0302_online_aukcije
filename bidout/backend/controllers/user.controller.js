import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

import User from '../models/User.model.js';
import { generateToken } from '../utils/generateToken.js';
import Product from '../models/Product.model.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Fill all the required fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role ? role : 'buyer',
  });

  const token = generateToken(user._id);
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, role } = user;
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id,
        name,
        email,
        photo,
        role,
        token,
      },
    });
  } else {
    res.status(400);
    throw new Error('Something went wrong while registering the user');
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Fill all the required fields');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    res.status(403);
    throw new Error('Wrong credentials');
  }

  const token = generateToken(user._id);
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { _id, name, email, photo, role } = user;
    res.status(201).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        _id,
        name,
        email,
        photo,
        role,
        token,
      },
    });
  } else {
    res.status(400);
    throw new Error('Something went wrong while logging in the user');
  }
});

export const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: true,
  });
  return res
    .status(200)
    .json({ success: true, message: 'Logged out successfully' });
});

export const getLoggedInUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('Logged in user not found');
  }

  const productsSoldTo = await Product.find({
    soldTo: req.user._id,
  }).countDocuments();

  let productsPostedBy = null;
  if (user.role === 'seller' || user.role === 'admin') {
    productsPostedBy = await Product.find({
      user: req.user._id,
    }).countDocuments();
  }

  let totalUsers = null;
  if (user.role === 'admin') {
    totalUsers = await User.find({}).countDocuments();
  }

  let totalProducts = null;
  if (user.role === 'admin') {
    totalProducts = await Product.find({}).countDocuments();
  }

  res.status(200).json({
    success: true,
    data: {
      ...user._doc,
      productsSoldTo,
      productsPostedBy,
      totalUsers,
      totalProducts,
    },
  });
});

export const getUsersBalance = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('Logged in user not found');
  }

  res.status(200).json({
    success: true,
    data: user.balance,
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('Logged in user not found');
  }

  const { name, contactNumber } = req.body;

  let photo = '';
  if (req.file) {
    let uploadedFile;
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Bidding/Accounts',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      throw new Error('Something went wrong while uploading the image');
    }

    photo = uploadedFile.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      name,
      contactNumber,
      photo: photo.length > 0 ? photo : user.photo,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: 'User profile updated successfully',
    data: updatedUser,
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const usersList = await User.find({});

  if (!usersList.length) {
    return res.status(400).json({
      success: false,
      message: 'No users found!',
    });
  }

  res.status(200).json({
    success: true,
    data: usersList,
  });
});

export const getTotalIncome = asyncHandler(async (req, res) => {
  try {
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      data: admin.commissionBalance,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});
