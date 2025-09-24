import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter user's name"],
    },
    email: {
      type: String,
      required: [true, "Enter user's email"],
      unique: [true, "User's email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Enter user's password"],
    },
    photo: {
      type: String,
      default:
        'https://www.shareicon.net/data/2016/01/20/706222_identity_512x512.png',
    },
    role: {
      type: String,
      enum: ['admin', 'seller', 'buyer'],
      default: 'buyer',
    },
    contactNumber: {
      type: String,
      default: '',
    },
    commissionBalance: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model('User', UserSchema);
export default User;
