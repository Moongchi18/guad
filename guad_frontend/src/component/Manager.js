import style from "../source/Manager.module.css";
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
      <div className={style.All_Mbox}>
        <h1 className={style.page_name}>관리자 외 사용을 금합니다.</h1>
        <div>
          <div className={style.Mbox}>
            <div className={style.logo_box}>
              <img src={logo}></img>
            </div>
            <div className={style.mileage_box}>
              <h3>
                <strong>관리자</strong>님 환영합니다!
              </h3>
            </div>
            <div className={style.Mbox_button}>
              <button className={style.member}>회원정보</button>
              <button className={style.mileage}>마일리지</button>
            </div>
          </div>
        </div>
        <div className={style.category}>
          <h3>최근 가입 회원</h3>
        </div>

        <div className={style.insert_list}>
          <div>
            <img src={sell_1}></img>
            <h3>셀린느 폴코 트리오페...</h3>
          </div>

          <div>
            <img src={sell_2}></img>
            <h3>셀린느 폴코 트리오페...</h3>
          </div>
        </div>

        <div className={style.category}>
          <h3>신고내역</h3>
        </div>

        <div className={style.buy_list}>
          <div className={style.insert_list}>
            <div>
              <img src={sell_1}></img>
              <h3>셀린느 폴코 트리오페...</h3>
            </div>

            <div>
              <img src={sell_2}></img>
              <h3>셀린느 폴코 트리오페...</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manager;
