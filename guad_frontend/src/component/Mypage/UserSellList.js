import style from "../../source/Mypage.module.css";
import { useEffect, useState } from "react";
import sell_1 from "../../source/img/selling_item_ex1.png";
import sell_2 from "../../source/img/selling_item_ex2.png";
import axios from "axios";

function UserSellList() {
  return (
    <>
      <div className={style.category}>
        <h3>판매 내역</h3>
      </div>

      <div className={style.sell_list_all}>
        {/* <div className={style.no_sell_info}>
            <button>상품 구매하러 가기</button>
          </div>  */}

        {/* {sellList && ( */}
        {/* 거래완료 */}
        <div className={style.sell_list}>
          <div className={style.item_bb}>
            <img src={sell_1} alt="1"></img>
            <img
              src={require("../../source/img/del2.png")}
              alt="1"
              className={style.del_icon}
            ></img>
          </div>
          <div className={style.sell_list_info}>
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
            <h3>
              <strong>구매자 연락처 : </strong>01044443333
            </h3>
          </div>
          <div className={style.sellcheck}>
            <button className={style.button}>거래완료</button>
            <h3>
              <strong>구매 일자 : </strong>2022년 10월 24일
            </h3>
          </div>
        </div>
        {/* 거래중 */}
        <div className={style.sell_list}>
          <div className={style.item_bb}>
            <img src={sell_2} alt="1"></img>
            <img
              src={require("../../source/img/del1.png")}
              alt="1"
              className={style.del_icon}
            ></img>
          </div>
          <div className={style.sell_list_info}>
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
            <h3>
              <strong>구매자 연락처 : </strong>01044443333
            </h3>
          </div>
          <div className={style.sellcheck}>
            <button className={style.button}>거래중</button>
            <h3>
              <strong>구매 일자 : </strong>2022년 10월 24일
            </h3>
          </div>
        </div>
        {/* 경매만료 */}
        <div className={style.sell_list}>
          <div className={style.item_bb}>
            <img src={sell_2} alt="1"></img>
            <img
              src={require("../../source/img/del1.png")}
              alt="1"
              className={style.del_icon}
            ></img>
          </div>
          <div className={style.sell_list_info}>
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
            <h3>
              <strong>구매자 연락처 : </strong>01044443333
            </h3>
          </div>
          <div className={style.sellcheck}>
            <button className={style.button}>경매만료</button>
            <h3>
              <strong>구매 일자 : </strong>2022년 10월 24일
            </h3>
          </div>
        </div>
        {/* 판매대기 */}
        <div className={style.sell_list}>
          <div className={style.item_bb}>
            <img src={sell_2} alt="1"></img>
            <img
              src={require("../../source/img/del1.png")}
              alt="1"
              className={style.del_icon}
            ></img>
          </div>
          <div className={style.sell_list_info}>
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
            <h3>
              <strong>구매자 연락처 : </strong>01044443333
            </h3>
          </div>
          <div className={style.sellcheck}>
            <button className={style.button}>판매대기</button>
            <h3>
              <strong>구매 일자 : </strong>2022년 10월 24일
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSellList;
