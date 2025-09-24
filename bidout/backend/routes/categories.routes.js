import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategory,
} from '../controllers/categories.controller.js';
import { adminProtect, authProtect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/fileUpload.js';

const router = express.Router();

router.post('/', authProtect, upload.single('image'), createCategory);
router.get('/', getAllCategories);
router.get('/:id', authProtect, adminProtect, getCategoryDetails);
router.put('/:id', authProtect, adminProtect, updateCategory);
router.delete('/:id', authProtect, adminProtect, deleteCategory);

export default router;
