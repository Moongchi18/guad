import { useRef } from "react";
import style from "../source/Sell_After.module.css";
import BuyReview from "./Moodal/BuyReview";

function Sell_After() {
  const modalOpen = useRef();

  const closeModal = () => {
    modalOpen.current.style = "display:none;";
  };
  const openModal = () => {
    modalOpen.current.style = "display:block;";
  };
  return (
    <>
      <BuyReview closeModal={closeModal} modalOpen={modalOpen} />
      <div className={style.cont1}>
        <h2>구매 확인</h2>
        <div className={style.top}>
          <img src={require("../source/img/check03.png")} alt="체크" />
          <p>성공적으로 거래되었습니다.</p>
          <button type="button" onClick={openModal}>
            상품 리뷰하기
          </button>
        </div>
      </div>
      <div className={style.cont2}>
        <img src={require("../source/img/big_item.png")} alt="제품사진" />
        <div class={style.right_side}>
          <span className={style.category}>
            <p>의류</p>
            <p> / </p>
            <p>가방</p>
          </span>
          <span className={style.title}>디올 가방 재고 처리합니다!</span>
          <p className={style.add}>
            배송주소<strong>서울시 종로구 인사동길 12 대일빌딩 7층</strong>
          </p>
          <p className={style.seller}>
            판매자 : <strong>시흥기린</strong>
          </p>
          <p className={style.del}>
            배송비<strong>배송비 포함</strong>
          </p>
          <p className={style.price}>
            판매가<strong>450,000</strong>
          </p>
        </div>
      </div>
      <div className={style.btn_area}>
        <button type="button" className={style.my}>
          마이 페이지로 가기
        </button>
        <button type="button" className={style.go}>
          쇼핑 계속하기
        </button>
      </div>
    </>
  );
}
export default Sell_After;
