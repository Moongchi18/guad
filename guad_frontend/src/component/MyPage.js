import style from "../source/Mypage.module.css";
import logo from "../source/img/mypage.png";
import sell_1 from "../source/img/selling_item_ex1.png";
import sell_2 from "../source/img/selling_item_ex2.png";
import plus from "../source/img/icons_plus.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Mypage() {
  const [sellList, setSellList] = useState("");
  const [buyList, setBuyList] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/mypage", {})
      .then((response) => {
        setSellList();
        setBuyList();
      })
      .catch((error) => {});
  }, []); 

  return (
    <>
      <div className={style.All_Mbox}>
        <h1 className={style.page_name}>마이페이지</h1>
        <div>
          <div className={style.Mbox}>
            <div className={style.logo_box}>
              <img src={logo} alt="1"></img>
            </div>
            <div className={style.mileage_box}>
              <h3>
                <strong>시흥 기린</strong>님 환영합니다!
              </h3>
              <h3>
                현재마일리지 <strong>1,000,000</strong>원
              </h3>
            </div>
            <div className={style.Mbox_button}>
              <button className={style.member}>회원정보</button>
              <button className={style.mileage}>마일리지</button>
            </div>
          </div>
        </div>
        <div className={style.category}>
          <h3>등록 상품 내역</h3>
        </div>
        <div className={style.insert_list}>
          <div className={style.no_sell_info}>
            <h3>등록된 상품이 없습니다.</h3>
            <h3>내 상품을 간편하게 등록해보세요.</h3>
            <button>
              <img src={plus} alt="1"></img>
              <div>상품 등록하러 가기</div>
            </button>
          </div>
          {sellList && (
            <div>
              <img src={sell_1} alt="1"></img>
              <img src={sell_2} alt="1"></img>
            </div>
          )}
        </div>
        <div className={style.category}>
          <h3>상품 구매 내역</h3>
        </div>

        <div className={style.buy_list}>
          <div className={style.no_buy_info}>
            <button>상품 구매하러 가기</button>
          </div>

          {buyList && (
            <div>
              <img src={sell_1} alt="1"></img>
              <div className={style.buy_list_info}>
                <h3>날짜 : 2022년 10월 24일 </h3>
                <h3>
                  상품명 : 꾸찌아니하지 않지만 그래도 그러하지 않기에 그러한
                  꾸지가방
                </h3>
                <h3>가격 : 1,000,000</h3>
                <h3>주소 : 경기도 구리시 인창동 극동아파트 104동 804호</h3>
              </div>

              <img src={sell_2} alt="1"></img>
              <div className={style.buy_list_info}>
                <h3>날짜 : 2022년 10월 24일 </h3>
                <h3>
                  상품명 : 꾸찌아니하지 않지만 그래도 그러하지 않기에 그러한
                  꾸지가방
                </h3>
                <h3>가격 : 1,000,000</h3>
                <h3>주소 : 경기도 구리시 인창동 극동아파트 104동 804호</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Mypage;
