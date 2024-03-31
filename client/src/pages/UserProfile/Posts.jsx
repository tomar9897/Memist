import React from "react";
import "../../components/PostSide/PostSide.css";
import Posts from "../../components/Posts/Posts";

const PostSideUser = () => {
  return (
    <div className="PostSide p-4 md:p-8">
      {/* <PostShare /> */}
      <Posts />
    </div>
  );
};

export default PostSideUser;
