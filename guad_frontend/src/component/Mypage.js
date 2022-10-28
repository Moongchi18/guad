import style from "../source/Mypage.module.css";
import logo from "../source/img/mypage.png";
import sell_1 from "../source/img/selling_item_ex1.png";
import sell_2 from "../source/img/selling_item_ex2.png";
import plus from "../source/img/icons_plus.png";
import { useEffect, useState } from "react";
import axios from "axios";
import MoodalMileage from "./MoodalMileage";
import RegistList from "./RegistList";



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
      <MoodalMileage />
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

        <RegistList  />
   

      </div>
    </>
  );
}

export default Mypage;
