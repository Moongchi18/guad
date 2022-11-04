import { useEffect } from "react";
import { useState } from "react";
import style from "../source/SellItem.module.css";

function Up_Before({ openModal, clickStart, item }) {
  const [auctionPeriodText, setAuctionPeriodText] = useState();
  console.log(typeof item.auctionPeriod)

  useEffect(() => {
    console.log(item)
    if (item.auctionPeriod) {
      const date = new Date(
        item.auctionPeriod.slice(0, 10) +
        " " +
        item.auctionPeriod.slice(12, 19)
      );
      date.setHours(date.getHours() + 9);
      setAuctionPeriodText(
        `${date.getFullYear()}년 ${date.getMonth() + 1
        }월 ${date.getDate()}일 ${date.getHours()}시까지`
      );
    }
  }, [item])


  return (
    <>
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
          <span className={style.sell_price}>경매 시작가</span>
          <span className={style.sell_number}>{item.auctionStartPrice?.toLocaleString()}</span>
        </div>
        <div className={style.button_bb}>
          <button className={style.bb_buy} onClick={clickStart}>
            입찰 참여
          </button>
          <span className={style.bb_date}>{auctionPeriodText}</span>
        </div>
      </div>
    </>
  );
}
export default Up_Before;
