import React from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../api/UserRequests";
import { getTimelinePosts } from "../../api/PostsRequests";
import { useState } from "react";
const ProfileCardUser = ({ location }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const getPosts = async () => {
    try {
      const { data } = await getTimelinePosts(location);
      console.log(data);
      setPosts(data);
      // setuserFollwing(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      const { data } = await getUser(location);
      console.log(data);
      setUser(data);
      // setuserFollwing(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
    getPosts();
  }, []);
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          className="size"
          src={
            user?.coverPicture
              ? serverPublic + user?.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="CoverImage"
        />
        <img
          className="size1"
          src={
            user?.profilePicture
              ? serverPublic + user?.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {user?.firstname} {user?.lastname}
        </span>
        <span>{user?.worksAt ? user?.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <a href={`/following/${location}`}>
              <span>{user?.followers.length}</span>
              <span>Followers</span>
            </a>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <a href={`/following/${location}`}>
              <span>{user?.following.length}</span>
              <span>Following</span>
            </a>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ProfileCardUser;
