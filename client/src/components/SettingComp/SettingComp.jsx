import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavIcons from "../NavIcons/NavIcons";
import { CgProfile } from "react-icons/cg";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import {  MdSecurity } from "react-icons/md";
import './SettingComp.css';
import {BiLogOutCircle} from 'react-icons/bi';
import Button from "../Buttons/Button";
import { logout } from "../../actions/AuthActions";
import {GiWhiteBook} from "react-icons/gi";
import {FcPrivacy} from "react-icons/fc";
import { useDispatch } from 'react-redux';
import UserProfile from "./UserProfile";
import PasswordandSecurity from "./PasswordandSecurity";
import PrivacyandPolicy from "./PrivacyandPolicy";
import TermsofServices from "./TermsofServices";
import PersonalDetails from "./PersonalDetails";
/*
  Add following Dependencies
  * npm install react-icons --save
*/
const  options = [
  {
    name: "User Profile",
    icon: <CgProfile className="inline-block text-xl"/>,
    link: "/settings/user-profile",
    component: <><UserProfile/></>
  },
  {
    name: "Personal Details",
    icon: <ImProfile className="inline-block text-xl"/>,
    link: "/settings/account-settings",
    component: <><PersonalDetails/></>
  },
  {
    name: "Password and Security",
    icon: <MdSecurity className="inline-block text-xl"/>,
    link: "/settings/privacy-and-safety",
    component: <><PasswordandSecurity/></>
  },
  {
    name: "Terms of Services",
    icon: <GiWhiteBook className="inline-block text-xl"/>,
    link: "/settings/privacy-and-safety",
    component: <><TermsofServices/></>
  },
  {
    name: "Privacy Policy",
    icon: <FcPrivacy className="inline-block text-xl"/>,
    link: "/settings/privacy-and-safety",
    component: <><PrivacyandPolicy/></>
  },
]

const SettingsContent = () => {
  const [selectedOption, setSelectedOption] = useState(null);


  
  return (
    <>
        <div className="settings-content">
        {selectedOption ? <SettingsOptionContentWrapper
          setSelectedOption={setSelectedOption}
        >
          {selectedOption.component}
        </SettingsOptionContentWrapper> : 
          <SettingsOptions setSelectedOption={setSelectedOption} />}
      </div>
    </>
  );
};
const SettingsOptions = ({ setSelectedOption })=> {

  const dispatch = useDispatch();

  const handleLogOut = ()=> {
    dispatch(logout())
  }
  return <div className="flex flex-col w-full">
    {options.map((option, index)=>{
      return <li
        key={index}
        onClick={()=>setSelectedOption(option)}
        className="flex gap-4 cursor-pointer hover:opacity-90 items-center justify-center w-full px-2 border-b-2 border-gray-200 py-4"
      >
        {option.icon} {option.name}
        <div className="ml-auto">
          <AiOutlineRight />
        </div>
        
      </li>
      
    })}
    <button className="button w-full h-10"  onClick={handleLogOut}>Log Out</button>
    
  </div>
}
const SettingsOptionContentWrapper = ({ children, setSelectedOption })=> {
  return <div className="flex flex-col w-full">
    <div className="py-2 mb-2" onClick={()=> setSelectedOption(null)}>
      <AiOutlineLeft className="text-xl font-bold cursor-pointer "/>      
    </div>
    {children}
  </div>
}
export default SettingsContent;