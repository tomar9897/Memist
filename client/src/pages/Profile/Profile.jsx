import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import { Grid } from "@mui/material";
const Profile = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <ProfileLeft />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProfileCard location="profilePage" />
        <PostSide />
      </Grid>

      <Grid item xs={12} md={3}>
        {" "}
        <RightSide />
      </Grid>
    </Grid>
  );
};

export default Profile;
