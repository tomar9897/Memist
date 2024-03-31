import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTimelinePosts } from "../../actions/PostsAction";
import NavIcons from "../../components/NavIcons/NavIcons";
import Post from "../../components/Post/Post";
import "../../components/Post/Post.css";
import RightSide from "../../components/RightSide/RightSide";
import ProfileSide from "../../components/profileSide/ProfileSide";

const TrendingPosts = () => {
  const [value, setValue] = useState(0);
  const [activeComponent, setActiveComponent] = useState("profile");
  const [rightSideOpen, setRightSideOpen] = useState(false);
  const [buttonContainerVisible, setButtonContainerVisible] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.innerWidth <= 880
  );

  const toggleRightSide = () => {
    setRightSideOpen(!rightSideOpen);
  };

  const toggleButtonContainer = () => {
    setButtonContainerVisible(!buttonContainerVisible);
  };

  const toggleActiveComponent = (component) => {
    setActiveComponent(component);
    setButtonContainerVisible(false); // Close the button container when switching components
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if (!posts) return "No Posts";
  if (params.id) posts = posts?.filter((post) => post.userId === params.id);

  return (
    <>
      {isMobileScreen ? (
        // Mobile view
        <div className="mobile-view">
          <h4>Trending Post</h4>
          <div
            className={`button-container ${
              buttonContainerVisible ? "active" : ""
            }`}
          >
            <div className="mb-5">
              <NavIcons onClick={toggleButtonContainer} />
            </div>
            {buttonContainerVisible && (
              <div className="button-options-overlay">
                <button
                  className="button-option"
                  onClick={() => toggleActiveComponent("post")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                <button
                  className="button-option"
                  onClick={() => toggleActiveComponent("post")}
                >
                  Post
                </button>
              </div>
            )}
          </div>
          <div className="mobile-post-container ">
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
          </div>
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <ProfileSide />
          </Grid>
          <Grid item xs={12} md={6}>
            <h4 style={{ fontWeight: "bold" }} className="mb-3">
              Trending Post
            </h4>
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
          </Grid>
          <Grid item xs={12} md={3}>
            {" "}
            <RightSide />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default TrendingPosts;
