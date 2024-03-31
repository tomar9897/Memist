// AdminRoute.js
import express from 'express';
import PostModel from '../models/postModel.js';

const router = express.Router();

// Middleware to ensure only admins can access these routes
router.use((req, res, next) => {
    const user = req.user; // Assuming you have authentication middleware setting `req.user`
    if (user && user.isAdmin) { // Assuming isAdmin property indicates admin status
        next(); // User is an admin, proceed
    } else {
        res.status(403).json({ message: 'Permission denied' });
    }
});

// Route to get a list of pending posts for approval
router.get('/pending-posts', async(req, res) => {
    try {
        const pendingPosts = await PostModel.find({ status: 'pending' });
        res.status(200).json(pendingPosts);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Route to approve a specific post
router.put('/approve-post/:postId', async(req, res) => {
    const postId = req.params.postId;
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            postId, { status: 'approved' }, { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

export default router;