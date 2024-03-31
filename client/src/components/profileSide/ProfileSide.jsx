import React, { useState, useEffect } from 'react'; // Import useEffect
import FollowersCard from '../FollowersCard/FollowersCard';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfileSide.css';

const ProfileSide = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.innerWidth <= 768
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

  return(
    <div className="ProfileSide">
      {isMobileScreen ? (
        <div>
          <div className='mt-8 '>
          <ProfileCard location="homepage" />
          </div>
          <FollowersCard />
        </div>
      ) : (
        <div>
          <div className='logo mb-5'>
          <LogoSearch />
          </div>
          <ProfileCard location="homepage "  />
          <FollowersCard />
        </div>
      )}
    </div>
  );
};

export default ProfileSide;
