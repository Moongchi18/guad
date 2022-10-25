

import logo from "../source/img/mypage.png";
import sell_1 from "../source/img/selling_item_ex1.png";
import sell_2 from "../source/img/selling_item_ex2.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Manager() {

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
        <div className="All_Mbox">
          <h1 className="page_name">관리자 외 사용을 금합니다.</h1>
          <div>
            <div className="Mbox">
              <div className="logo_box">
                <img src={logo}></img>
              </div>
              <div className="mileage_box">
                <h3>
                  <strong>관리자</strong>님 환영합니다!
                </h3>
              </div>
              <div className="Mbox_button">
                <button className="member">회원정보</button>
                <button className="mileage">마일리지</button>
              </div>
            </div>
          </div>
          <div className="category">
            <h3>최근 가입 회원</h3>
          </div>
          <div className="insert_list">
            {sellList && (
              <div>
                <img src={sell_1}></img>
                <img src={sell_2}></img>
              </div>
            )}
          </div>
          <div className="category">
            <h3>신고내역</h3>
          </div>
  
          <div className="buy_list">
            {buyList && (
              <div>
                <img src={sell_1}></img>
                <div className="buy_list_info">
                  <h3>날짜 : 2022년 10월 24일 </h3>
                  <h3>
                    상품명 : 꾸찌아니하지 않지만 그래도 그러하지 않기에 그러한
                    꾸지가방
                  </h3>
                  <h3>가격 : 1,000,000</h3>
                  <h3>주소 : 경기도 구리시 인창동 극동아파트 104동 804호</h3>
                </div>
  
                <img src={sell_2}></img>
                <div className="buy_list_info">
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

export default Manager;