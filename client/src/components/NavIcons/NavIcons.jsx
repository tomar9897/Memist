import React, { useState, useEffect } from "react";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { Link } from "react-router-dom";
import { UilSetting } from "@iconscout/react-unicons";
import { UilSearch } from "@iconscout/react-unicons";
import Settings from "../SettingComp/SettingComp"; // Import the Settings component
import { BiSolidSearch } from "react-icons/bi";

import Notifications from "../Notifications";
import Search from "../SearchPage/LogoSearch";
import Chat from "../../pages/Chat/Chat";

const navOptions = {
  notifications: <Notifications />,
  settings: <Settings />,
  profile: <Search />,
  chat: <Chat />,
};

const NavIcons = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.innerWidth <= 880
  );

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
    <>
      {isMobileScreen ? (
        <div>
          <div className="navIcons border-l-2 border-r-2 border-t-2 bb-none p-3 rounded-md rounded-b-none bg-[#ffe7a6]">
            <Link to="../home">
              <img src={Home} alt="" onClick={() => setSelectedOption(null)} />
            </Link>
            <div
              className="settings-icon"
              onClick={() =>
                setSelectedOption((opt) => {
                  if (opt === navOptions.settings) return null;
                  return navOptions.settings;
                })
              }
            >
              <UilSetting />
            </div>
            <div
              className=""
              onClick={() =>
                setSelectedOption((opt) => {
                  if (opt === navOptions.profile) return null;
                  return navOptions.profile;
                })
              }
            >
              <UilSearch />
            </div>
            <img
              src={Noti}
              alt=""
              onClick={() =>
                setSelectedOption((opt) => {
                  if (opt === navOptions.notifications) return null;
                  return navOptions.notifications;
                })
              }
            />
            <div>
              {/* <Link to="../chat"> */}
              <img
                src={Comment}
                alt=""
                onClick={() =>
                  setSelectedOption((opt) => {
                    if (opt === navOptions.chat) return null;
                    return navOptions.chat;
                  })
                }
              />
              {/* </Link> */}
            </div>
          </div>
          <div className="bg-[#ffe7a6] border-l-2 border-r-2 border-b-2 p-3 rounded-b-md">
            {selectedOption && selectedOption}
          </div>
        </div>
      ) : (
        <div>
          <div className="navIcons border-l-2 border-r-2 border-t-2 bb-none p-3 rounded-md rounded-b-none bg-[#ffe7a6]">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>
            <div
              className="settings-icon"
              onClick={() =>
                setSelectedOption((opt) => {
                  if (opt === navOptions.settings) return null;
                  return navOptions.settings;
                })
              }
            >
              <UilSetting />
            </div>
            <img
              src={Noti}
              alt=""
              onClick={() =>
                setSelectedOption((opt) => {
                  if (opt === navOptions.notifications) return null;
                  return navOptions.notifications;
                })
              }
            />
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
          <div className="bg-[#ffe7a6] border-l-2 border-r-2 border-b-2 p-3 rounded-b-md">
            {selectedOption && selectedOption}
          </div>
        </div>
      )}
    </>
  );
};

export default NavIcons;
