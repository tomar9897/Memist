import React, { useState, useEffect } from "react";
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
  };

    // Initial check
  handleResize();

    // Attach the event listener
  window.addEventListener("resize", handleResize);

    // Clean up the event listener
  return () => {
    window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`RightSide ${isMobile ? 'mobile' : ''}`}>
      <NavIcons/>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;