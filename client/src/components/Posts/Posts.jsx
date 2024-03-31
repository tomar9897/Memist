import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import "./Posts.css";
import { CircularProgress } from "@mui/material";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if (!posts) return "No Posts";
  if (params.id) posts = posts?.filter((post) => post.userId === params.id);
  console.log(posts);
  return (
    <div className="Posts">
      {loading ? (
        <CircularProgress
          color="success"
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        />
      ) : (
        posts?.map((post, id) => {
          return <Post data={post} key={id} />;
        })
      )}
    </div>
  );
};

export default Posts;
