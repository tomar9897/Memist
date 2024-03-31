import express from "express";
import {
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  unfollowUser,
  updateUser,
  getUserByEmail,
  getFollowers,
  getFollowing,
  searchUsers,
  approvePost,
} from "../controllers/UserController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/approvePost/:id", approvePost);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/:id/getFollowers", getFollowers);
router.get("/:id/getFollowing", getFollowing);
router.get("/search", authMiddleWare, searchUsers);

router.delete("/:id", authMiddleWare, deleteUser);
// router.delete("/:id", authMiddleWare, deleteUser);
router.put("/:id", authMiddleWare, updateUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, unfollowUser);

export default router;
