import CarouselB from "./CarouselB";
import style from "../source/Main.module.css";
import { useEffect, useRef, useState } from "react";
import video from "../source/img/back_01.mp4";

function Main() {
  const [tip, setTip] = useState(false);
  useEffect(() => {}, []);
  return (
    <>
      <div className={style.all_back}>
        <div className={style.control}>
          <video autoPlay loop muted className={style.back_v}>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <CarouselB />
        <span className={style.side_text}>
          오르내림은 중고 경매 거래 사이트로
          <br />
          가격을 올려가며 경쟁하는 오름경매, 점점 할인해서 판매하는 내림경매,
          <br />
          상품을 확인해 판매자와 직접 거래하는 일반거래 시스템을 제공합니다.
        </span>
        <div className={style.qq_box}>
          <div className={style.tip}>
            <p
              className={tip === true ? `${style.open_p}` : `${style.close_p}`}
            >
              <strong>오르내림 거래종류</strong>
              <br />
              <strong className={style.t_1}>오름 경매</strong>란? 상품의
              <strong className={style.tt_1}>가격을 올려가며</strong> 구매자들이
              경쟁하는 식으로 판매가 가능한 판매방식입니다
              <br />
              <strong className={style.t_2}>내림 경매</strong>란? 판매하기
              어렵거나 빠르게 판매하고 싶은 상품의
              <strong className={style.tt_2}>가격을 내려가며</strong> 판매하는
              방식입니다 <br />
              <strong className={style.t_3}>일반 판매</strong>란? 판매자가 올린
              상품을 구매자가 1대1로 구매하는
              <strong className={style.tt_3}>일반적인 거래방식</strong>입니다
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
      </div>
    </>
  );
}
export default Main;
