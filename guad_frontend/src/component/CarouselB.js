import style from "../source/Carousel.module.css";

function CarouselB() {
  return (
    <>
      <div className={style.caro_b}>
        <div className={style.caro_in}>
          <div className={style.caro_L}>
            <ul class={style.Words}>
              <li class={style.Words_line}>
                <p>&nbsp;</p>
                <p>MONEY</p>
              </li>
              <li class={style.Words_line}>
                <p>MONEY</p>
                <p>DEAL AUCTION</p>
              </li>
              <li class={style.Words_line}>
                <p>DEAL AUCTION</p>
                <p>SUCCESSFUL BID</p>
              </li>
              <li class={style.Words_line}>
                <p>SUCCESSFUL BID</p>
                <p>CHOICE</p>
              </li>
              <li class={style.Words_line}>
                <p>CHOICE</p>
                <p>SELLING ITEM</p>
              </li>
              <li class={style.Words_line}>
                <p>SELLING ITEM</p>
                <p>TIME</p>
              </li>
              <li class={style.Words_line}>
                <p>TIME</p>
                <p>&nbsp;</p>
              </li>
            </ul>
          </div>
          <div className={style.caro_R}>
            <ul>
              <li>
                <img src={require("../source/img/tt1.png")} alt="오름판매" />
                <strong>오름 판매</strong>
              </li>
              <li>
                <img src={require("../source/img/tt2.png")} alt="내림판매" />
                <strong>내림 판매</strong>
              </li>
              <li>
                <img src={require("../source/img/tt3.png")} alt="일반판매" />
                <strong>일반 판매</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default CarouselB;
