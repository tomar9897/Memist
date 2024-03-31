import React from "react";
import "./index.css";

import { BsFillBellFill } from "react-icons/bs";

const dummyData = [
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    },
    {
        avatar: 'https://bit.ly/kent-c-dodds',
        name: 'Zain',
        message: 'start following you',
        time: '8h'
    }
]

export default function Notifications () {
    return <>
        <div className="notifications-content ">
            <h5 className="font-md">
                <BsFillBellFill className="inline"/> {dummyData.length} New Notifications 
            </h5> 
            <div className="flex flex-col w-full mt-3 gap-5 overflow-y-auto">
                {dummyData.map((d, idx)=>
                    <NotificationCard 
                        key={idx}
                        avatar={d.avatar}
                        name={d.name}
                        message={d.message}
                        time={d.time}
                    />
                )}
            </div>
        </div>
    </>
}

const NotificationCard = ({
    avatar, name, message, time
})=> {
    return <li className="flex gap-2 pb-2 border-b-2 cursor-pointer hover:opacity-90">
        <img className="w-10 h-10 rounded-full inline" 
            src={avatar} alt="Rounded avatar" 
        />
        <div className="flex flex-col gap-1">
            <p className="text-sm leading-none pt-1 line-clamp-1 font-semibold">{name}</p>
            <div className="flex w-full gap-1 items-center">
                <p className="leading-tight text-xs line-clamp-2">
                    {message}
                </p>
                <b className="inline-block text-xs ml-auto mr-1 leading-none">
                    {time}
                </b>
            </div>
        </div>
    </li>
}