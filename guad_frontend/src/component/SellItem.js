import { useEffect, useRef, useState } from "react";
import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import BuyConfirm from "./Moodal/BuyConfirm";
import axios from "axios";

function SellItem({ history, match }) {
  const [item, setItem] = useState({})
  const [review, setReview] = useState([])
  const [auctionPeriodText, setAcutionPeriodText] = useState();

  console.log(match.params.itemNum)
  useEffect(() => {
    axios.get(`http://localhost:8080/sellitem/${match.params.itemNum}`)
      .then(response => {
        console.log(response.data.auctionPeriod)
        setItem(response.data)
        const date = response.date.auctionPeriod
        // const date2 = new Date(date1.get)
        console.log(new Date(response.date.auctionPeriod))
        setAcutionPeriodText(`${date.getHours()}년 ${date.getMonth()}월 ${date.getDate()}일까지`)
      })
      .catch(error => console.log(error))
    axios.get(`http://localhost:8080/review/${match.params.itemNum}`)
      .then(response => {
        setReview(response.data)
      })
      .catch(error => console.log(error))
  }, [])

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
      <BuyConfirm closeModal2={closeModal2} modalChange2={modalChange2} itemNum={item.itemNum} />
      <NotifyWrite closeModal={closeModal} modalChange={modalChange} itemNum={item.itemNum} />
      <div id={style.item_num} className={style.item_num}>{item.itemNum}</div>
      <div className={style.item_top}>
        <h2>{item.sellType === 'd' ? '일반판매'
          : (item.sellType === 'u' ? '오름경매'
            : '내림경매')}</h2>
        <div className={style.img_item}>
          <img src={require("../source/img/big_item.png")} alt="제품사진" />
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
          <span className={style.seller}>
            판매자 : <strong>{item.nickname}</strong>
          </span>
          <div className={style.deli_bb}>
            <span className={style.deli_name}>배송비</span>
            <span className={style.deli_tag}>배송비 포함</span>
          </div>
          <div className={style.sell_bb}>
            <span className={style.sell_price}>판매가</span>
            <span className={style.sell_number}>{item.sellType === 'n' ? item.itemPrice:item.auctionStartPrice}</span>
          </div>
          <div className={style.button_bb}>
            <button type="button" className={style.bb_buy} onClick={openModal2}>
              구매
            </button>
            <span className={style.bb_date}>2022년 10월 31일까지</span>
          </div>
        </div>
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>
          따끈따끈한 신상 가방 재고 처리합니다.
          <br />
          상태는 A급 엄청 깔끔하게 관리했습니다.
          <br />
          많은 관심 부탁드립니다.
        </p>
        <div className={style.sell_review}>
          <h2>판매자님에 대한 리뷰</h2>
          <img src={require("../source/img/red_star.png")} alt="붉은별" />
          <span>4</span>
        </div>
        <div className={style.sell_review_show}>
          <ul>
            <li>
              <span>시흥기린</span>
              <img src={require("../source/img/gray_star.png")} alt="회색별" />
              <span>3</span>
              <span className={style.review_write}>이것은 리뷰입니다.</span>
            </li>
            <li>
              <span>수원원숭이</span>
              <img src={require("../source/img/gray_star.png")} alt="회색별" />
              <span>4</span>
              <span className={style.review_write}>이것은 리뷰입니다.</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default SellItem;
