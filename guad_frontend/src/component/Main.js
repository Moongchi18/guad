import CarouselB from "./CarouselB";
import "../source/Main.css";

function Main() {
  return (
    <>
      <CarouselB />
      <div className="cont1">
        <h2>Transaction type</h2>
        <div className="cont1_bot">
          <ul>
            <li>
              <img
                src={require("../source/img/o1.png")}
                alt="오름경매"
                className="o_up"
              />
              <strong>오름</strong>경매
            </li>
            <li>
              <img
                src={require("../source/img/o2.png")}
                alt="내림경매"
                className="o_down"
              />
              <strong>내림</strong>경매
            </li>
            <li>
              <img
                src={require("../source/img/o3.png")}
                alt="일반판매"
                className="o_normal"
              />
              일반판매
            </li>
          </ul>
        </div>
      </div>
      <div className="cont2">
        <h2>
          <img
            src={require("../source/img/cont2_text.png")}
            alt="이번주 인기 상품"
          />
        </h2>
        <div className="cont2_L">
          <img src={require("../source/img/t6.jpg")} alt="메인상품" />
        </div>
        <div className="cont2_R">
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
      <div className="cont3">
        <h2>최신 등록 상품</h2>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}
export default Main;
