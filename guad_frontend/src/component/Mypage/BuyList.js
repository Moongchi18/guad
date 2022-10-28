import style from "../../source/Mypage.module.css";
import { useState } from "react";

function BuyList() {
  const [buyList, setBuyList] = useState({});

  return (
    <>
      <div className={style.category}>
        <h3>구매 내역</h3>
      </div>

      <div className={style.buy_list_all}>
        {/* <div className={style.no_buy_info}>
            <button>상품 구매하러 가기</button>
          </div>  */}

        {/* {buyList && ( */}

        <div className={style.buy_list}>
          <div className={style.item_bb}>
            <img
              src={require("../../source/img/selling_item_ex1.png")}
              alt="1"
            ></img>
            <img
              src={require("../../source/img/del2.png")}
              alt="1"
              className={style.del_icon}
            ></img>
          </div>
          <div className={style.buy_list_info}>
            <h3>
              <strong>날짜 : </strong>2022년 10월 24일{" "}
            </h3>
            <h3>
              <strong>상품명 : </strong>꾸찌아니하지 않지만 그래도 그러하지
              않기에 그러한 꾸지가방
            </h3>
            <h3>
              <strong>가격 : </strong>1,000,000
            </h3>
            <h3>
              <strong>주소 : </strong>경기도 구리시 인창동 극동아파트 104동
              804호
            </h3>
          </div>
          <div className={style.buycheck}>
            <button>거래완료</button>
            <h3>
              <strong>구매 일자 : </strong>2022년 10월 24일
            </h3>
          </div>
        </div>

        <div className={style.buy_list}>
          <div className={style.item_bb}>
            <img
              src={require("../../source/img/selling_item_ex2.png")}
              alt="1"
            ></img>
            <img
              src={require("../../source/img/del1.png")}
              alt="1"
              className={style.del_icon}
            ></img>
          </div>
          <div className={style.buy_list_info}>
            <h3>
              <strong>날짜 : </strong>2022년 10월 24일
            </h3>

            <h3>
              <strong>상품명 : </strong>꾸찌아니하지 않지만 그래도 그러하지
              않기에 그러한 꾸지가방
            </h3>
            <h3>
              <strong>가격 : </strong>1,000,000
            </h3>
            <h3>
              <strong>주소 : </strong>경기도 구리시 인창동 극동아파트 104동
              804호
            </h3>
          </div>
          <div className={style.buycheck}>
            <button>거래중</button>
            <h3>
              <strong>구매 일자 : </strong>2022년 10월 24일
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyList;
