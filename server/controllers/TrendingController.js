// TrendingController.js
import PostModel from '../models/postModel.js';

export const getPostsByTrendingTag = async(req, res) => {
    const { trendingTag } = req.params;

    try {
        const posts = await PostModel.find({ trendingTags: trendingTag });

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this tag' });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts' });
    }
};