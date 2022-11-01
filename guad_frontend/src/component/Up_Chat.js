import style from "../source/Up_Chat.module.css";
import React, { useEffect, useRef, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

var stompClient = null;
const Up_Chat = ({ nickname }) => {
  const inputCursor = useRef();
  const [publicChats, setPublicChats] = useState([]);
  const [userData, setUserData] = useState({
    username: nickname,
    message: "",
  });

  const openChat1 = useRef();
  const openChat2 = useRef();
  const openChat3 = useRef();
  const openChat4 = useRef();

  const ClickChat = () => {
    openChat1.current.style = "top:598px;";
    openChat2.current.style = "";
  };

  console.log(nickname);
  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe("/sub/public", onMessageReceived);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    publicChats.push(payloadData);
    setPublicChats([...publicChats]);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    if (stompClient && userData.message !== "") {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
      };
      console.log(chatMessage);
      stompClient.send("/pub/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
      inputCursor.current.focus();
    }
  };

  const handlerEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      sendValue();
    }
  };
  useEffect(() => {
    connect();
  }, []);
  return (
    <>
      <div className={style.container}>
        <div className={style.chat_box}>
          {/* target top:598px */}
          <div className={style.chat_content}>
            <ul className={style.chat_messages}>
              {/* target height:0px */}
              {publicChats.map((chat, index) => (
                <li
                  className={`${style.message} ${
                    chat.senderName === userData.username && style.self
                  }`}
                  key={index}
                >
                  {chat.senderName !== userData.username && (
                    <div className={style.avatar}>{chat.senderName}</div>
                  )}
                  <div className={style.message_data}>{chat.message}</div>

                  {chat.senderName === userData.username && (
                    <div className={`${style.avatar} ${style.self}`}>
                      {chat.senderName}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className={style.send_message}>
              <input
                type="text"
                className={style.input_message}
                ref={inputCursor}
                placeholder="글을 작성해주세요!"
                value={userData.message}
                onChange={handleMessage}
                onKeyPress={handlerEnterKeyPress}
              />
              <button type="button" className={style.onChat}>
                채팅 참여
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Up_Chat;
