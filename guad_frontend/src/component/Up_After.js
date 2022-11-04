import { useEffect } from "react";
import style from "../source/SellItem.module.css";
import Up_Chat from "./Up_Chat";

function Up_After({ openModal, nickname, itemNum }) {
    console.log(nickname)
    console.log(itemNum)
  return (
    <>
      <div className={style.info_top}>
        <img
          src={require("../source/img/warn.png")}
          alt="신고"
          onClick={openModal}
        />
        <span className={style.top_head}>상품 정보</span>
        <span className={style.top_cate}>의류 / 가방</span>
        <span className={style.top_title}>디올 가방 재고 처리합니다!</span>
        <div className={style.sell_aa}>
          <span className={style.sell_price}>현재 가격</span>
          <span className={style.sell_number}>450,000</span>
        </div>
        <span className={style.seller1}>
          판매자 : <strong>시흥기린</strong>
        </span>
        <div className={style.button_bb}>
          <button className={`${style.aa_buy} ${style.aa_btn}`}>
            입찰 : <p>500,000</p>
          </button>
          <Up_Chat nickname={nickname} itemNum={itemNum}/>
        </div>
      </div>
    </>
  );
}
export default Up_After;
