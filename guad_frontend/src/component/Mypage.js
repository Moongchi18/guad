import style from "../source/Mypage.module.css";
import logo from "../source/img/mypage.png";
import sell_1 from "../source/img/selling_item_ex1.png";
import sell_2 from "../source/img/selling_item_ex2.png";
import plus from "../source/img/icons_plus.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Mileage from "./Mileage";
import BuyList from "./BuyList";

function Mypage() {
  const [sellList, setSellList] = useState({});
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
      <Mileage />
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
              <button className={style.mileage} id="mileage">
                마일리지
              </button>
            </div>
          </div>
        </div>
        <BuyList  />

        <div className={style.category}>
          <h3>상품 구매 내역</h3>
        </div>

        <div className={style.buy_list}>
          {/* <div className={style.no_buy_info}>
            <button>상품 구매하러 가기</button>
          </div>  */}

          {/* {buyList && ( */}

          <div className={style.sell_list}>
            <div className={style.item_bb}>
              <img src={sell_1} alt="1"></img>
              <img
                src={require("../source/img/del2.png")}
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
            <div className={style.sellcheck}>
              <button>거래완료</button>
              <h3>
                <strong>구매 일자 : </strong>2022년 10월 24일
              </h3>
            </div>
          </div>

          <div className={style.sell_list}>
            <div className={style.item_bb}>
              <img src={sell_2} alt="1"></img>
              <img
                src={require("../source/img/del1.png")}
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
            <div className={style.sellcheck}>
              <button>거래중</button>
              <h3>
                <strong>구매 일자 : </strong>2022년 10월 24일
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypage;
