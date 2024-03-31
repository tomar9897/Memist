// trendingRoutes.js
import express from 'express';
import { getPostsByTrendingTag } from '../controllers/TrendingController.js';

const router = express.Router();
router.get('/:trendingTag', getPostsByTrendingTag);
export default router;