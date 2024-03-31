import React from "react";
import Logo from "../../img/logo.png";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <a href="/">
        <img src={Logo} alt="" />
      </a>
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
