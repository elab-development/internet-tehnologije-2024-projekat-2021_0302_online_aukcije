import express from 'express';
import {
  getBiddingHistory,
  placeBid,
  sellProduct,
} from '../controllers/bidding.controller.js';
import { authProtect, sellerProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authProtect, placeBid);
router.get('/:productId/history', getBiddingHistory);

router.post('/:productId/sell', authProtect, sellerProtect, sellProduct);

export default router;
