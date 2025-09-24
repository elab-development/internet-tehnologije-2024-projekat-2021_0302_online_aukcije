import express from 'express';
import {
  getAllUsers,
  getLoggedInUser,
  getTotalIncome,
  getUsersBalance,
  loginStatus,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from '../controllers/user.controller.js';
import { adminProtect, authProtect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/fileUpload.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/isloggedin', loginStatus);
router.post('/logout', logoutUser);

router.get('/loggedinuser', authProtect, getLoggedInUser);
router.get('/loggedinuser/balance', authProtect, getUsersBalance);
router.put('/profile', authProtect, upload.single('image'), updateUserProfile);

router.get('/', authProtect, adminProtect, getAllUsers);
router.get('/admin/income', authProtect, adminProtect, getTotalIncome);

export default router;
