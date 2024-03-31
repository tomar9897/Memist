import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Button } from "@mantine/core";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [show, setShow] = useState(false);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.innerWidth <= 880
  );
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://socketformemist.onrender.com");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  const handleMobile = (chat) => {
    setCurrentChat(chat);
    setShow(true);
  };
  return (
    <>
      {!isMobileScreen ? (
        <div className="Chat">
          {/* Left Side */}
          <div className="Left-side-chat">
            <LogoSearch />
            <div className="Chat-container">
              <h2>Chats</h2>
              <div className="Chat-list">
                {chats.map((chat) => (
                  <div
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                  >
                    <Conversation
                      data={chat}
                      currentUser={user._id}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}

          <div className="Right-side-chat">
            <div style={{ marginTop: "5.5rem" }}>{/* <NavIcons /> */}</div>
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
          </div>
        </div>
      ) : (
        <>
          {/* <div className="Chat"> */}
          {/* Left Side */}
          {/* <div>
          
            <div>
              <div
                style={{
                  width: "100%",
                  alignSelf: "flex-center",
                  marginBottom: "1rem",
                }}
              >
                <NavIcons />
              </div>
            </div>
          </div> */}
          {/* </div> */}
          {!show ? (
            <div className="Chat-list">
              <div className="Chat-container">
                <h2>Chats</h2>

                <Button onClick={() => setShow(true)}>allow</Button>

                <div className="Chat-list">
                  {chats.map((chat) => (
                    <div
                      onClick={() => {
                        setCurrentChat(chat);
                      }}
                    >
                      <Conversation
                        data={chat}
                        currentUser={user._id}
                        online={checkOnlineStatus(chat)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Button onClick={() => setShow(false)}>Back</Button>

              <ChatBox
                chat={currentChat}
                currentUser={user._id}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Chat;
