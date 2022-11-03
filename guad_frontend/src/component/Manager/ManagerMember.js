import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../source/img/mypage.png";
import logo_d from "../../source/img/mypage_d.png";
import style from "../../source/ManagerMember.module.css";
import MemeberInfo from "../Moodal/MemberInfo";

function ManagerMember() {
  const [datas, setDatas] = useState([]);
  const [infoEmail, setInfoEmail] = useState("");

  const handlerMember = (e) => {
    setInfoEmail(e);
    openModal();
  };

  const modalChange = useRef();

  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = (e) => {
    modalChange.current.style = "display:block;";
  };

  useEffect(() => {
    axios.get("http://localhost:8080/admin/member").then((response) => {
      console.log(response.data);
      setDatas(response.data);
    });
  }, []);

  return (
    <>
      <MemeberInfo
        modalChange={modalChange}
        closeModal={closeModal}
        infoEmail={infoEmail}
      />
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
              <button className={style.member}>회원관리</button>
              <Link to="/manager/notify">
                <button className={style.mileage}>신고내역</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={style.category}>
          <h3 className={style.list}>회원목록</h3>
          <h3 className={style.name}>닉네임</h3>
          <h3 className={style.id}>아이디</h3>
          <h3 className={style.address}>주소</h3>
        </div>

        <div className={style.user_detail}>
          {datas &&
            datas.map((ml, index) => (
              <div
                className={style.user_list}
                key={ml.memberNum}
                onClick={() => handlerMember(ml.email)}
              >
                <div className={style.logo} onClick={openModal} name={ml.email}>
                  <img src={logo_d} alt="1" value={ml.memberNum} />
                </div>
                <div className={style.name}>
                  <h3>{ml.nickname}</h3>
                </div>
                <div className={style.id}>
                  <h3>{ml.email}</h3>
                </div>
                <div className={style.address}>
                  <h3>{ml.address}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default ManagerMember;
