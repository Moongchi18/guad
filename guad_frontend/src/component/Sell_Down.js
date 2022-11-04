import { useRef, useEffect,useState } from "react";
import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";


function Sell_Down(match) {
  const [itemNum, setItemNum] =useState(10);

  useEffect(() => {
    setItemNum(document.getElementById(`${style.item_num}`).innerText);
    console.log(">>>>" + itemNum);
  },[])


  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };



  return (
    <>
      <NotifyWrite closeModal={closeModal} modalChange={modalChange} itmeNum={itemNum}/>
      <div id={style.item_num} className={style.item_num}>2</div>
      <div className={style.item_top}>
        <h2 className={style.down}>
          <strong>내림</strong>판매
        </h2>
        <div className={style.img_item}>
          <img
            src={require("../source/img/big_item.png")}
            alt="제품사진"
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
          <span className={style.top_cate}>의류 / 가방</span>
          <span className={style.top_title}>디올 가방 재고 처리합니다!</span>
          <div className={style.rating_option}>
            <img src={require("../source/img/star.png")} alt="별점" />
            <span>4</span>
          </div>
          <div className={style.rating_option}>
            <img src={require("../source/img/see.png")} alt="조회수" />
            <span>33</span>
          </div>
          <span className={style.seller}>
            판매자 : <strong>시흥기린</strong>
          </span>
          <div className={style.deli_bb}>
            <span className={style.deli_name}>배송비</span>
            <span className={style.deli_tag}>배송비 포함</span>
          </div>
          <div className={style.sell_bb}>
            <span className={style.sell_price}>판매가</span>
            <span className={style.sell_number}>450,000</span>
          </div>
          <div className={style.button_bb}>
            <button className={style.bb_down}>입찰 참여</button>
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
      </div>
      <div className={style.review}>
        <h2>경매 후기</h2>
        <textarea placeholder="경매 후기를 작성해주세요."></textarea>
        <button type="button">작성</button>
      </div>
    </>
  );
}
export default Sell_Down;
