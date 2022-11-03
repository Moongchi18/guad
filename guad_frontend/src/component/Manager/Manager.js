import style from "../../source/Manager.module.css";
import logo from "../../source/img/mypage.png";
import logo_d from "../../source/img/mypage_d.png";
import sell_1 from "../../source/img/selling_item_ex1.png";
import sell_2 from "../../source/img/selling_item_ex2.png";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Notify from "../Moodal/Notify";
import axios from "axios";

function Manager() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/admin/member").then((response) => {
      console.log(response.data);
      setDatas(response.data);
    });
  }, []);

  return (
    <>
      <div className={style.All_Mbox}>
        <h1 className={style.page_name}>관리자 페이지</h1>
        <div>
          <div className={style.Mbox}>
            <div className={style.logo_box}>
              <img src={logo} alt="1"></img>
            </div>
            <div className={style.mileage_box}>
              <h3>
                <strong>관리자</strong>님 환영합니다!
              </h3>
            </div>
            <div className={style.Mbox_button}>
              <Link to="/manager/member">
                <button className={style.member}>회원관리</button>
              </Link>
              <Link to="/manager/notify">
                <button className={style.mileage}>신고내역</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={style.category}>
          <h3>최근 가입 회원</h3>
        </div>
        <div className={style.join}>
          {datas &&
            datas.map((memberList) => (
              <div className={style.user_list} key={memberList.memberNum}>
                <img src={logo_d} alt="1"></img>
                <h3 key={memberList.memberNum}>{memberList.nickname}</h3>
              </div>
            ))}
        </div>

        <div className={style.category}>
          <h3>신고내역</h3>
        </div>

        <div className={style.notify}>
          <div className={`${style.notify_list} ${style.list_one}`}>
            <img src={sell_1} alt="1" />
            <h3>셀린느 폴코 트리오페...</h3>
          </div>

          <div className={style.notify_list}>
            <img src={sell_2} alt="1" />
            <h3>셀린느 폴코 트리오페...</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manager;
