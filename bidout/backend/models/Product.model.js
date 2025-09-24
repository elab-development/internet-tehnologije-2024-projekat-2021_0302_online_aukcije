import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, "Enter product's title"],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Enter product's slug"],
  },
  description: {
    type: String,
    required: [true, "Enter product's description"],
    trim: true,
  },
  image: {
    type: Object,
    default: {},
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  commission: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Enter product's price"],
  },
  height: { type: Number },
  width: { type: Number },
  weight: { type: Number },
  lengthPic: { type: Number },
  mediumUsed: { type: String },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isSoldout: {
    type: Boolean,
    default: false,
  },
  soldTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  soldPrice: {
    type: Number,
  },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
