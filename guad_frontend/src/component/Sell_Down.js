import axios from "axios";
import { useRef, useEffect, useState } from "react";
import style from "../source/SellItem.module.css";
import DownConfirm from "./Moodal/DownConfirm";
import NotifyWrite from "./Moodal/NotifyWrite";

function Sell_Down({ match }) {
  const [auctionPeriodText, setAuctionPeriodText] = useState();
  const [item, setItem] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sellitem/${match.params.itemNum}`
      )
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
        const date = new Date(
          response.data.auctionPeriod.slice(0, 10) +
            " " +
            response.data.auctionPeriod.slice(12, 19)
        );
        date.setHours(date.getHours() + 9);
        setAuctionPeriodText(
          `${date.getFullYear()}년 ${
            date.getMonth() + 1
          }월 ${date.getDate()}일 ${date.getHours()}시까지`
        );
      })
      .catch((error) => console.log(error));
  }, []);
  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };
  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  const modalChange2 = useRef();
  const closeModal2 = () => {
    modalChange2.current.style = "display:none;";
  };
  const openModal2 = () => {
    modalChange2.current.style = "display:block;";
  };

  return (
    <>
      <NotifyWrite
        closeModal={closeModal}
        modalChange={modalChange}
        itemNum={item.itemNum}
      />
      <DownConfirm closeModal2={closeModal2} modalChange2={modalChange2} />
      <div id={style.item_num} className={style.item_num}>
        2
      </div>
      <div className={style.item_top}>
        <h2 className={style.down}>
          <strong>내림</strong>판매
        </h2>
        <div className={style.img_item}>
          <img
            src={`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgName}`}
            alt={"img" + item.notifyNum}
            className={style.item}
          />
          <img
            src={require("../source/img/del1_b.png")}
            alt="내림경매"
            className={style.up2}
          />
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className={style.info_top}>
          <img
            src={require("../source/img/warn.png")}
            alt="신고"
            onClick={openModal}
          />
          <span className={style.top_head}>상품 정보</span>
          <span className={style.top_cate}>{item.itemType}</span>
          <span className={style.top_title}>{item.itemSub}</span>
          <div className={style.rating_option}>
            <img src={require("../source/img/star.png")} alt="별점" />
            <span>4</span>
          </div>
          <div className={style.rating_option}>
            <img src={require("../source/img/see.png")} alt="조회수" />
            <span>{item.hitCnt}</span>
          </div>
          <span className={style.seller_dd}>
            판매자 : <strong>{item.nickname}</strong>
          </span>
          <div className={style.start_bb}>
            <span className={style.deli_name}>시작 경매가</span>
            <span className={style.deli_tag}>1,000,000</span>
          </div>
          <div className={style.deli_bb}>
            <span className={style.deli_name}>최저 경매가</span>
            <span className={style.deli_tag}>
              200,000<strong> (50%)</strong>
            </span>
          </div>
          <div className={style.sell_bb}>
            <span className={style.sell_price}>현재 경매가</span>
            <span className={style.sell_number}>
              {item.auctionStartPrice?.toLocaleString()}
            </span>
          </div>
          <div className={style.button_bb}>
            <button className={style.bb_down} onClick={openModal2}>
              입찰 참여
            </button>
            <span className={style.bb_date}>
              현재 할인율 : <strong>30%</strong>
            </span>
            <p>
              남은 경매 시간 : <strong>{auctionPeriodText}</strong>
            </p>
          </div>
        </div>
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>{item.itemContents}</p>
      </div>
      <div className={style.review}>
        <h2>후기 작성</h2>
        <textarea placeholder="경매 후기를 작성해주세요."></textarea>
        <button type="button">작성</button>
      </div>
    </>
  );
}
export default Sell_Down;
