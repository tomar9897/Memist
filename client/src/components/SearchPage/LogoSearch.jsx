import React from "react";
import Logo from "../../img/logo.png";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";

const Search = () => {
  return (
    <div className="LogoSearchs">
      {/* <img src={Logo} alt="" /> */}
      <div className="Searchs">
        <input type="text" placeholder="#Explore" style={{ width: "100%" }} />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default Search;
