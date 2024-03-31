/* eslint-disable jsx-a11y/img-redundant-alt */
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import NavIcons from "../../components/NavIcons/NavIcons";
import RightSide from "../../components/RightSide/RightSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import FollowerCard from "../FollwerPage/FollowerCard";
const dummyData = [
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
  {
    avatar: "https://bit.ly/kent-c-dodds",
    name: "Zain",
    message: "start following you",
    time: "8h",
  },
];
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Following() {
  const [value, setValue] = React.useState(0);
  const [activeComponent, setActiveComponent] = useState("profile");
  const [rightSideOpen, setRightSideOpen] = useState(false);
  const [buttonContainerVisible, setButtonContainerVisible] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = React.useState(
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
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
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
            <Grid item xs={12} md={6}>
              <Box
                sx={{ width: "100%" }}
                className="PostSide p-4 md:p-8"
                style={{ backgroundColor: "#ffffffa3" }}
              >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <h4>Likes</h4>
                  <div className="flex flex-col w-full mt-3 gap-5 overflow-y-auto">
                    {dummyData.map((d, idx) => (
                      <FollowerCard
                        key={idx}
                        avatar={d.avatar}
                        name={d.name}
                        message={d.message}
                        time={d.time}
                      />
                    ))}
                  </div>
                </Box>
              </Box>
            </Grid>
          </div>
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <ProfileSide />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{ width: "100%" }}
              className="PostSide p-4 md:p-8"
              style={{ backgroundColor: "#ffffffa3" }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <h1>Likes</h1>
                <hr style={{ borderBottom: "1px solid orange" }} />
                <div className="flex flex-col w-full mt-3 gap-5 overflow-y-auto">
                  {dummyData.map((d, idx) => (
                    <FollowerCard
                      key={idx}
                      avatar={d.avatar}
                      name={d.name}
                      message={d.message}
                      time={d.time}
                    />
                  ))}
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            {" "}
            <RightSide />
          </Grid>
        </Grid>
      )}
    </>
  );
}
