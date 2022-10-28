import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";

function Sell_End() {
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
      <NotifyWrite />
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
          <span className={style.up1}>경매종료</span>
          <img
            src={require("../source/img/del3_b.png")}
            alt="경매끝"
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
          <div className={style.end_bb}>
            <span className={style.last_price}>최종 낙찰가</span>
            <span className={style.last_number}>450,000</span>
          </div>
          <div className={style.last_bb}>
            <h2>
              판매자 : <strong>시흥기린</strong>
            </h2>
            <span className={style.bb_last}>
              최종 입찰자 : <strong>부산물개</strong>
            </span>
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
    </>
  );
}
export default Sell_End;
