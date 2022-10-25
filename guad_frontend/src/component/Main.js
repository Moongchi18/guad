import CarouselB from "./CarouselB";
import style from "../source/Main.module.css";

function Main() {
  return (
    <>
      <CarouselB />
      <div className={style.cont1}></div>
      <div className={style.cont2}>
        <h2>
          <img
            src={require("../source/img/cont2_text.png")}
            alt="이번주 인기 상품"
          />
        </h2>
        <div className={style.cont2_L}>
          <img src={require("../source/img/t6.jpg")} alt="메인상품" />
        </div>
        <div className={style.cont2_R}>
          <ul>
            <li>
              <img src={require("../source/img/t1.jpg")} alt="첫번째" />
            </li>
            <li>
              <img src={require("../source/img/t2.jpg")} alt="두번째" />
            </li>
            <li>
              <img src={require("../source/img/t3.jpg")} alt="세번째" />
            </li>
            <li>
              더 많은 상품
              <br />
              보러가기
            </li>
            <li>
              <img src={require("../source/img/t4.jpg")} alt="네번째" />
            </li>
            <li>
              <img src={require("../source/img/t5.jpg")} alt="다섯번째" />
            </li>
          </ul>
        </div>
      </div>
      <div className={style.cont3}>
        <h2>최신 등록 상품</h2>
        <ul>
          <li>
            <img src={require("../source/img/ttt1.jpg")} alt="제품1" />
          </li>
          <li>
            <img src={require("../source/img/ttt2.jpg")} alt="제품2" />
          </li>
          <li>
            <img src={require("../source/img/ttt3.jpg")} alt="제품3" />
          </li>
          <li>
            <img src={require("../source/img/ttt4.jpg")} alt="제품4" />
          </li>
          <li>
            <img src={require("../source/img/ttt5.jpg")} alt="제품5" />
          </li>
        </ul>
      </div>
    </>
  );
}
export default Main;
