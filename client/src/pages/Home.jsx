import React, { useState, useEffect } from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
import NavIcons from "../components/NavIcons/NavIcons";
import { Grid } from "@mui/material";

const Home = () => {
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={isMobileScreen ? "" : ""}>
      {isMobileScreen ? (
        // Mobile view
        <div className="mobile-view">
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
            <PostSide />
          </div>
        </div>
      ) : (
        // Desktop and tablet view
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <ProfileSide />
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <PostSide />
          </Grid>

          <Grid item xs={12} md={3}>
            {" "}
            <RightSide />
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default Home;
