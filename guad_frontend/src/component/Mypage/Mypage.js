import style from "../../source/Mypage.module.css";
import logo from "../../source/img/mypage.png";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MoodalMileage from "../Moodal/Mileage";
import RegistList from "./RegistList";
import BuyList from "./BuyList";
import SellList from "./SellList";



function Mypage() {

  window.onload = function(){
    const button = document.getElementsByClassName(`${style.button}`);
    console.log(button);
    console.log(button[0]);
    
    for (let i = 0; i < button.length; i++) {
      if (button[i].textContent = "거래완료") {
        button[i].style.backgroundColor = '#217A4F';
      } else if (button[i].textContent = "거래중") {
        button[i].style.backgroundColor = '#D9D9D9';
      } else if (button[i].textContent = "경매완료") {
        button[i].style.backgroundColor = '#BA101E';
      } else {
        button[i].style.backgroundColor = '#253C76';
      }
    };
  };

  
  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  return (
    <>
      <MoodalMileage closeModal={closeModal} modalChange={modalChange}/>
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
              <button className={style.mileage} onClick={openModal}>
                마일리지
              </button>
            </div>
          </div>
        </div>
        <RegistList/>
        <BuyList/>
        <SellList/>
      </div>
    </>
  );
}

export default Mypage;