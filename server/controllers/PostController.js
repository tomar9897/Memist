import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// creating a post

// In PostController.js
// export const createPost = async (req, res) => {
//     const { title, content, trendingTags, /* ... other fields */ } = req.body;

//     try {
//         const newPost = new PostModel({
//             title,
//             content,
//             trendingTags, // Include trending tags here
//             // ... other fields
//         });

//         // Save the post and respond to the client
//         const savedPost = await newPost.save();
//         res.status(201).json(savedPost);
//     } catch (error) {
//         res.status(500).json({ message: 'Post creation failed' });
//     }
// };

// In PostController.js
export const createPost = async (req, res) => {
  const { title, content, trendingTags /* ... other fields */ } = req.body;

  try {
    const newPost = new PostModel({
      title,
      content,
      trendingTags, // Include trending tags here
      // ... other fields
    });

    // Save the post and respond to the client
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Post creation failed" });
  }
};

// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};
export const getAllPost = async (req, res) => {
  //   const id = req.params.id;
  console.log("dhd");
  try {
    const post = await PostModel.find({ approval: true });
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addCommentToPost = async (req, res) => {
  const { userId, comment, postId } = req.body;
  console.log("meeeeee");
  try {
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json("Post not found");
    }

    const newComment = {
      userId,
      text: comment,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json("Comment added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// In your controllers/PostController.js

export const generateShareableLink = async (req, res) => {
  const postId = req.params.postId; // Assuming postId is part of the URL

  try {
    // Here you can generate the shareable link using the postId
    const shareableLink = `https://yourwebsite.com/posts/${postId}`;

    res.status(200).json({ link: shareableLink });
  } catch (error) {
    res.status(500).json({ message: "Error generating shareable link" });
  }
};
