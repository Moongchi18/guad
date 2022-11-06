import CarouselB from "./CarouselB";
import style from "../source/Main.module.css";
import { useEffect, useRef, useState } from "react";

function Main() {
  const [tip, setTip] = useState(false);
  useEffect(() => {}, []);
  return (
    <>
      <CarouselB />
      <div className={style.qq_box}>
        <div className={style.tip}>
          <p className={tip === true ? `${style.open_p}` : `${style.close_p}`}>
            <strong>오르내림 거래종류!</strong>
            <br />
            <strong>오름 경매</strong>란? 판매하고 싶은 상품을 가격을 올려가며
            구매자들이 경쟁하는 식으로 판매가 가능한 판매방식입니다!
            <br />
            <strong>내림 경매</strong>란? 판매되지 않았거나 빠르게 판매하고 싶은
            상품을 가격을 내려가며 판매하는 방식입니다! <br />
            <strong>일반 판매</strong>란? 판매자가 올린 상품을 구매자가 1대1로
            구매하는 일반적인 거래방식입니다!
          </p>
        </div>
        <button
          className={style.q_mark}
          type="button"
          onMouseEnter={() => setTip(true)}
          onMouseLeave={() => setTip(false)}
        >
          <img src={require("../source/img/q_mark.png")} alt="도움말" />
        </button>
      </div>
    </>
  );
}
export default Main;
