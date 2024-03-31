import { Grid } from "@mui/material";
import React from "react";
import ProfileCardUser from "../../components/ProfileCardUser/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import PostSideUser from "./Posts";
import "./Profile.css";
import { getTimelinePosts } from "../../api/PostsRequests";
import { getUser } from "../../api/UserRequests";
import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

export default function UserProfile() {
  const id = window.location.pathname.split("/")[2];
  console.log(id, "window.location.pathname");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <ProfileLeft />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProfileCardUser location={id} />
        <PostSideUser />
      </Grid>

      <Grid item xs={12} md={3}>
        {" "}
        <RightSide />
      </Grid>
    </Grid>
  );
}
