import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import style from "../source/SellItem.module.css";
import UpConfirm from "./Moodal/UpConfirm";
import Up_Chat from "./Up_Chat";

var stompClient = null;
function Up_After({ openModal, item }) {
  const [publicChats, setPublicChats] = useState([]);
  const [auctionPeriodText, setAuctionPeriodText] = useState();

  console.log(publicChats)
  console.log(item)

  const connect = () => {
    let Sock = new SockJS(
      `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/ws`
    );
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    stompClient.subscribe(`/sub/up/${item?.itemNum}`, onMessageReceived);
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
  const sendValue = (userData) => {
    if (stompClient && userData.message !== "") {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
      };
      console.log(chatMessage);
      stompClient.send(
        `/pub/up/${item?.itemNum}`,
        {},
        JSON.stringify(chatMessage)
      );
    }
  };
  console.log(item);

  useEffect(() => {
    console.log(item);
    if (item.auctionPeriod) {
      const date = new Date(
        item.auctionPeriod.slice(0, 10) + " " + item.auctionPeriod.slice(12, 19)
      );
      date.setHours(date.getHours() + 9);
      setAuctionPeriodText(
        `${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일 ${date.getHours()}시까지`
      );
    }
  }, [item]);

  const modalChange2 = useRef();
  const closeModal2 = () => {
    modalChange2.current.style = "display:none;";
  };
  const openModal2 = () => {
    modalChange2.current.style = "display:block;";
  };
  useEffect(() => {
    connect();
  }, [])

  return (
    <>
      <UpConfirm closeModal2={closeModal2} modalChange2={modalChange2} />
      <div className={style.info_top}>
        <img
          src={require("../source/img/warn.png")}
          alt="신고"
          onClick={openModal}
        />
        <span className={style.top_head}>상품 정보</span>
        <span className={style.top_cate}>{item.itemType}</span>
        <span className={style.top_title}>{item.itemSub}</span>
        <div className={style.sell_aa}>
          <span className={style.sell_price}>현재 입찰가</span>
          <span className={style.sell_number}>
            {item.auctionStartPrice?.toLocaleString()}
          </span>
        </div>
        <div className={style.sell_aa}>
          <span className={style.sell_price}>즉시구매 가격</span>
          <span className={style.sell_number2}>
            {item.auctionMaxPrice?.toLocaleString()}
          </span>
        </div>
        <span className={style.seller1}>
          판매자 : <strong>{item.nickname}</strong>
        </span>
        <div className={style.button_bb}>
          <button
            type="button"
            className={style.aa_buy_now}
            onClick={openModal2}
          >
            즉시 구매
          </button>
          <button className={`${style.aa_buy} ${style.aa_btn}`}>
            입찰 : <p>500,000</p>
          </button>
          <button type="button" className={style.aa_buy}>
            현재 입찰자 : <strong></strong>
          </button>
          {item.itemNum && (
            <Up_Chat
              item={item}
              sendValue={sendValue}
              publicChats={publicChats}
              connect={connect}
            />
          )}
          <p>
            남은 경매 시간 : <strong>{auctionPeriodText}</strong>
          </p>
        </div>
      </div>
    </>
  );
}
export default Up_After;
