import style from "../source/SellItem.module.css";
import Moodal3 from "./Moodal3";

function Sell_Up() {
  window.onload = function () {
    const modal = document.getElementById("my-modal");
    const closeBtn1 = document.getElementById("close");
    const closeBtn2 = document.getElementById("outMan");
    const openBtn1 = document.getElementById("openMan");

    openBtn1.addEventListener("click", openModal);
    closeBtn2.addEventListener("click", closeModal);

    function closeModal() {
      modal.style.display = "none";
    }

    function openModal() {
      modal.style.display = "block";
    }
  };
  return (
    <>
      <Moodal3 />
      <div className={style.item_top}>
        <h2>
          <strong>오름</strong>판매
        </h2>
        <div className={style.img_item}>
          <img
            src={require("../source/img/big_item.png")}
            alt="제품사진"
            className={style.item}
          />
          <img
            src={require("../source/img/del2_b.png")}
            alt="오름경매"
            className={style.up}
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
            id="openMan"
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
            <button className={style.bb_buy}>입찰 참여</button>
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
          <h2>댓글</h2>
          <textarea placeholder="댓글을 입력해주세요."></textarea>
        </div>
      </div>
    </>
  );
}
export default Sell_Up;
