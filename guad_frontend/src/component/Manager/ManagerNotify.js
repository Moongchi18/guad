import style from "../../source/ManagerNotify.module.css";
import logo from "../../source/img/mypage.png";
import sell_1 from "../../source/img/selling_item_ex1.png";
import sell_2 from "../../source/img/selling_item_ex2.png";
import Notify from "../Moodal/Notify";
import { useEffect, useState, useRef } from "react";
import axios from "axios";


function ManagerNotify(history) {

  const [datas, setDatas] = useState([]);
  console.log(datas);
  useEffect(() => {
    axios.get(`http://localhost:8080/notify/admin/list`)
      .then(response => {
        setDatas(response.data);
      })
      .catch(error => {
        if (error.response.status === 403) {
          alert("접근 권한이 없습니다. 로그인 후 다시 접속해 주세요.");
          // history.push("/login");
        }
      });
  }, []);

  const modalChange = useRef();

  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  return (
    <>
      <Notify closeModal={closeModal} modalChange={modalChange} />
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
              <button className={style.mileage}>신고내역</button>
            </div>
          </div>
        </div>

        <div className={style.category}>
          <h3>신고내역</h3>
        </div>
        <div className={style.notify}>
        {
          datas && datas.map(notify => (
            <div key={notify.notifyNum} className={style.notify_list} onClick={openModal} >
                <img src={sell_1} alt="1"></img>
                <h3>{notify.notifyTitle}</h3>
            </div>
          ))
        }

          <div className={style.notify_list}>
            <img src={sell_1} alt="1"></img>
            <h3>셀린느 폴코 트리오페두두무무수수후후우우주주</h3>
          </div>

          <div className={style.notify_list}>
            <img src={sell_2} alt="1"></img>
            <h3>셀린느 폴코 트리오페이뒤에어떤말이와도점점점으로표시된다.</h3>
          </div>

        </div>
      </div>
    </>
  );
}

export default ManagerNotify;
