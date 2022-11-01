import style from "../source/SellItem.module.css";

function Up_Before({ openModal, ClickStart }) {
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
          <button className={style.bb_buy} onClick={ClickStart}>
            입찰 참여
          </button>
          <span className={style.bb_date}>2022년 10월 31일까지</span>
        </div>
      </div>
    </>
  );
}
export default Up_Before;
