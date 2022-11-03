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

  const scrollToBottom = () => {
    openChat3.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const openChat1 = useRef();
  const openChat2 = useRef();
  const openChat3 = useRef();
  const openChat4 = useRef();
  const openChat5 = useRef();
  const openChat6 = useRef();

  const ClickChat = () => {
    openChat1.current.style = "top:37px; height:600px;";
    openChat2.current.style = "height:93%;";
    inputCursor.current.style = "display:inline-block;";
    openChat4.current.style = "display:none;";
    openChat5.current.style = "display:inline-block;";
    openChat6.current.style = "height:none";
  };

  const OffChat = () => {
    openChat1.current.style = "top:598px; height:none;";
    openChat2.current.style = "height:0%;";
    inputCursor.current.style = "display:none;";
    openChat4.current.style = "display:block;";
    openChat5.current.style = "display:none;";
    openChat6.current.style = "height:40px;";
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
    scrollToBottom();
  }, [publicChats]);
  return (
    <>
      <div className={style.container}>
        <div className={style.chat_box} ref={openChat1}>
          <div className={style.chat_content} ref={openChat6}>
            <ul className={style.chat_messages} ref={openChat2}>
              <button
                type="button"
                className={style.close_c}
                ref={openChat5}
                onClick={OffChat}
              >
                &times;
              </button>
              {publicChats.map((chat, index) => (
                <li
                  className={`${style.message} ${
                    chat.senderName === userData.username && style.self
                  }`}
                  key={index}
                  ref={openChat3}
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
              <button
                type="button"
                className={style.onChat}
                ref={openChat4}
                onClick={ClickChat}
              >
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
