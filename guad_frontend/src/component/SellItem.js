import style from "../source/SellItem.module.css";

function SellItem() {
  return (
    <>
      <div className={style.item_top}>
        <h2>일반판매</h2>
        <div className={style.img_item}>
          <img src={require("../source/img/big_item.png")} alt="제품사진" />
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className={style.info_top}>
          <img src={require("../source/img/warn.png")} alt="신고" />
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
            <button className={style.bb_buy}>구매</button>
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
