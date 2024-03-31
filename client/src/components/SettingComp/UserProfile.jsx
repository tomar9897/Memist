import { Button } from "@mui/material";
import React from "react";

const UserProfile = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Update User Profile</h1>

      <div>
        <form className="">
          <div className="p-3">
            <input className="p-3" placeholder=" Username" />
          </div>
          <div className="p-3">
            <input className="p-3" placeholder=" Bio" />
          </div>
          <div className="p-3">
            <input className="p-3" placeholder="Email" />
          </div>
          <div className="p-3">
            <input className="p-3" placeholder="Phone" />
          </div>
          <div className="p-3">
            <Button className="p-3 " variant="contained">
              Change Details
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
