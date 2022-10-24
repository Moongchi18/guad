import "../source/Carousel.css";
import $ from "jquery";

function CarouselB() {
  
  return (
    <>
      <div className="caro_b">
        <div className="caro_in">
          <div className="caro_L">
            <ul class="Words">
              <li class="Words-line">
                <p>&nbsp;</p>
                <p>MONEY</p>
              </li>
              <li class="Words-line">
                <p>MONEY</p>
                <p>DEAL AUCTION</p>
              </li>
              <li class="Words-line">
                <p>DEAL AUCTION</p>
                <p>SUCCESSFUL BID</p>
              </li>
              <li class="Words-line">
                <p>SUCCESSFUL BID</p>
                <p>CHOICE</p>
              </li>
              <li class="Words-line">
                <p>CHOICE</p>
                <p>SELLING ITEM</p>
              </li>
              <li class="Words-line">
                <p>SELLING ITEM</p>
                <p>TIME</p>
              </li>
              <li class="Words-line">
                <p>TIME</p>
                <p>&nbsp;</p>
              </li>
            </ul>
          </div>
          <div className="caro_R">
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
