// routes/FollowRoute.js
import express from 'express';
import { followUser, unfollowUser } from '../controllers/AuthController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router();
router.post('/follow/:userIdToFollow',authMiddleWare, followUser);

router.post('/unfollow/:userIdToUnfollow',authMiddleWare, unfollowUser);
export default router;