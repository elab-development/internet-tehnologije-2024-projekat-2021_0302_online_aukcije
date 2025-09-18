import express from 'express';
import {
  createProduct,
  deleteProduct,
  deleteProductAdmin,
  getAllProducts,
  getAllProductsFiltersQueries,
  getAllProductsOfLoggedInUser,
  getProductsDetails,
  getProductsDetailsBySlug,
  getProductsOfUser,
  getSoldProducts,
  getVerifiedProducts,
  getWonProductsOfLoggedInUser,
  updateProduct,
  verifyAndAddCommission,
} from '../controllers/product.controller.js';
import {
  adminProtect,
  authProtect,
  sellerProtect,
} from '../middleware/authMiddleware.js';
import { upload } from '../utils/fileUpload.js';

const router = express.Router();

router.post(
  '/',
  authProtect,
  sellerProtect,
  upload.single('image'),
  createProduct
);
router.get('/', getAllProducts);
router.get('/search', getAllProductsFiltersQueries);
router.get('/verified', getVerifiedProducts);
router.get('/soldout', getSoldProducts);
router.get('/slug/:slug', getProductsDetailsBySlug);
router.get('/:id', getProductsDetails);
router.put(
  '/:id',
  authProtect,
  sellerProtect,
  upload.single('image'),
  updateProduct
);
router.delete('/:id', authProtect, sellerProtect, deleteProduct);

router.get('/users/loggedIn', authProtect, getAllProductsOfLoggedInUser);
router.get('/users/loggedIn/won', authProtect, getWonProductsOfLoggedInUser);
router.get('/users/:id', getProductsOfUser);

router.patch(
  '/admin/:id/verify',
  authProtect,
  adminProtect,
  verifyAndAddCommission
);
router.delete(
  '/admin/:id/delete',
  authProtect,
  adminProtect,
  deleteProductAdmin
);

export default router;
