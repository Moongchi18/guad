import "../source/MypageInfo.css";
import logo from "../source/img/mypage.png";
import sell_1 from "../source/img/selling_item_ex1.png";
import sell_2 from "../source/img/selling_item_ex2.png";
import plus from "../source/img/icons_plus.png";
import { useEffect, useState } from "react";
import axios from "axios";

function MypageInfo() {


  useEffect(() => {
    axios
      .post("http://localhost:8080/api/mypage", {})
      .then((response) => {
    
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className="All_Mbox">
        <h1 className="page_name">마이페이지</h1>
        <div>
          <div className="Mbox">
            <div className="logo_box">
              <img src={logo}></img>
            </div>
            <div className="mileage_box">
              <h3>
                <strong>시흥 기린</strong>님 환영합니다!
              </h3>
              <h3>
                현재마일리지 <strong>1,000,000</strong>원
              </h3>
            </div>
            <div className="Mbox_button">
              <button className="member">회원정보</button>
              <button>마일리지</button>
            </div>
          </div>
        </div>
        <div className="category">
          <h3>회원정보 수정</h3>
        </div>
        <div className="member_info">
          <h3>아이디</h3><h3>s5s5z@naver.com</h3>
          <h3>닉네임</h3><h3>시흥기린</h3>
          <h3>주소</h3><input>서울시 종로구 인사동 12</input>
          <h3>상세주소</h3><input>대일빌딩 7층 1번 강의실</input>
          <h3>기존 비밀번호</h3><input></input>
          <h3>변경 비밀번호</h3><input></input>
          <h3>비밀번호 확인</h3><input></input>
        </div>
      </div>
    </>
  );
}

export default MypageInfo;
