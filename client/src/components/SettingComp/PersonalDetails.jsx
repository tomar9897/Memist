import React from "react";
import "./SettingComp.css";
const PersonalDetails = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Personal Details</h1>
      Memist Uses this information to verify your identity
      <br />
      <br />
      <div className="InfoCard">
        <h4 style={{ fontWeight: "bold" }}>Contact Information</h4>
        <div>
          <h4 style={{ fontWeight: "bold" }}>Name:</h4>
          blah blah
        </div>
        <div>
          <h4 style={{ fontWeight: "bold" }}> Username:</h4>
          blah blah
        </div>
        <div>
          <h4 style={{ fontWeight: "bold" }}> DOB:</h4>
          blaahhhh
        </div>
        {/* For changing your information */}
      </div>
    </div>
  );
};

export default PersonalDetails;
