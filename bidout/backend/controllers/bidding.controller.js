import asyncHandler from 'express-async-handler';
import BiddingProduct from '../models/Bidding.model.js';
import Product from '../models/Product.model.js';
import User from '../models/User.model.js';
import { sendMail } from '../utils/mailer.js';

export const placeBid = asyncHandler(async (req, res) => {
  const { productId, price } = req.body;
  const userId = req.user.id;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (!product.isVerified || product.isSoldout) {
    res.status(400);
    throw new Error('Bidding is closed');
  }

  if (product.price > price) {
    res.status(400);
    throw new Error('Your bid must be at least the price of the product');
  }

  // Not the highest Bid
  const highestBid = await BiddingProduct.findOne({
    product: productId,
  }).sort({ price: -1 });
  if (highestBid && price <= highestBid.price) {
    res.status(400);
    throw new Error('Your bid must be higher than currently highest bid');
  }

  // User already placed a bid before
  const existingBid = await BiddingProduct.findOne({
    user: userId,
    product: productId,
  });
  if (existingBid) {
    if (price <= existingBid.price) {
      res.status(400);
      throw new Error('Your bid must be higher than your previous bid');
    } else {
      existingBid.price = price;
      await existingBid.save();
      return res.status(200).json({
        success: true,
        message: 'Bid placed successfully',
        data: existingBid,
      });
    }
  }

  // User places first bid for this product
  const newBiddingProduct = await BiddingProduct.create({
    user: userId,
    product: productId,
    price,
  });

  res.status(201).json({
    success: true,
    message: 'Bid placed successfully',
    data: newBiddingProduct,
  });
});

export const getBiddingHistory = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const biddingHistory = await BiddingProduct.find({ product: productId })
    .sort('-updatedAt')
    .populate('user')
    .populate('product');

  res.status(200).json({
    success: true,
    data: biddingHistory,
  });
});

export const sellProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.isSoldout) {
    res.status(400);
    throw new Error('Product is sold out');
  }

  // Checking if logged in user posted this product
  if (product.user.toString() !== userId) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized',
    });
  }

  // Finding the highest bid
  const highestBid = await BiddingProduct.findOne({
    product: productId,
  })
    .sort({ price: -1 })
    .populate('user');
  if (!highestBid) {
    res.status(400);
    throw new Error('No bids found');
  }

  // Calculating the commission
  const commissionRate = product.commission;
  const commissionAmount = (commissionRate / 100) * highestBid.price;
  const finalPrice = highestBid.price - commissionAmount;

  // Update admins commission
  const adminUser = await User.findOne({ role: 'admin' });
  if (adminUser) {
    adminUser.commissionBalance += commissionAmount;
    await adminUser.save();
  }

  // Update sellers balance
  const sellerUser = await User.findById(product.user);
  if (sellerUser) {
    sellerUser.balance += finalPrice;
    await sellerUser.save();
  } else {
    return res.status(404).json({
      success: false,
      message: 'Seller not found',
    });
  }

  // Update products details
  product.isSoldout = true;
  product.soldTo = highestBid.user;
  product.soldPrice = finalPrice;
  await product.save();

  await sendMail({
    email: highestBid.user.email,
    subject: 'Congratulations! You won the auction!',
    message: `You have won the auction for ${product.title} with a bid of $${highestBid.price}`,
  });

  res.status(200).json({
    success: true,
    message: 'Product sold successfully',
  });
});
