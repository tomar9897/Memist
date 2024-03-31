import * as React from "react";

const FollowerCard = ({ avatar, name, message, time }) => {
  return (
    <li
      className="flex gap-3 pb-2  cursor-pointer hover:opacity-90"
      style={{ borderBottom: "1px solid orange" }}
    >
      <img
        className="w-10 h-10 rounded-full inline"
        src={"https://bit.ly/kent-c-dodds"}
        alt="Rounded avatar"
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm leading-none pt-1 line-clamp-1 font-semibold">
          {name}
        </p>
        <div className="flex w-full gap-1 items-center">
          <p className="leading-tight text-xs line-clamp-2">{message}</p>
          {/* <b className="inline-block text-xs ml-auto mr-1 leading-none">
            {time}
          </b> */}
        </div>
      </div>
      <div className="flex align-item-end">
        <button
          className={"button fc-button"}
          // onClick={handleFollow}
        >
          UnFollow
        </button>
      </div>
    </li>
  );
};

export default FollowerCard;
