import UserModel from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// udpate a user baad ma

export const updateUser = async (req, res) => {
  const id = req.params.id;
  // console.log("Data Received", req.body)
  const { _id, currentUserAdmin, password } = req.body;

  if (id === _id) {
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      // have to change this
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );
      console.log({ user, token });
      res.status(200).json({ user, token });
    } catch (error) {
      console.log("Error agya hy");
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied! You can update only your own Account.");
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Successfully!");
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Access Denied!");
  }
};

// Follow a User
// changed
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  console.log(id, _id);
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

// Unfollow a User
// changed
export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const unFollowUser = await UserModel.findById(id);
      const unFollowingUser = await UserModel.findById(_id);

      if (unFollowUser.followers.includes(_id)) {
        await unFollowUser.updateOne({ $pull: { followers: _id } });
        await unFollowingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("Unfollowed Successfully!");
      } else {
        res.status(403).json("You are not following this User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const getUserByEmail = async (req, res) => {
  const username = "pmdnawaz1";
  console.log(username);
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getFollowers = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    const followers = await UserModel.find({ _id: { $in: user.followers } });

    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getFollowing = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id");
  try {
    const user = await UserModel.findById(id);
    const following = await UserModel.find({ _id: { $in: user.following } });

    res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
export const editCustomerData = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(id, newData, { new: true });
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add approval boolean in post API
export const approvePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findByIdAndUpdate(
      postId,
      { approval: true },
      { new: true }
    );
    if (post) {
      res.status(200).json("Post approved!");
    } else {
      res.status(404).json("No such post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get followers for all user profiles
export const getAllFollowers = async (req, res) => {
  try {
    const users = await UserModel.find();
    const followers = users.map((user) => ({
      _id: user._id,
      username: user.username,
      followers: user.followers.length,
    }));

    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const searchUsers = async (req, res) => {
  const { query } = req.query;

  try {
    const users = await UserModel.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    const sanitizedUsers = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
