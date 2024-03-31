import express from "express";
import {
    createPost,
    deletePost,
    getPost,
    getTimelinePosts,
    likePost,
    updatePost,
    addCommentToPost,
    getAllPost, // Import the new controller function
    generateShareableLink,
} from "../controllers/PostController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/", createPost);
router.post("/comment", addCommentToPost);
router.get("/:id/timeline", getTimelinePosts);
router.get("/getAllPost", getAllPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get('/:postId/share', generateShareableLink);

export default router;