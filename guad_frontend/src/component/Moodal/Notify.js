import style from "../../source/Moodal4.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Notify({ closeModal, modalChange, notifyNum}) {

  const [datas, setDatas] = useState([]);
  console.log(datas);
  useEffect(() => {
    axios.get(`http://localhost:8080/notify/admin/${notifyNum}`)
      .then(response => {
        setDatas(response.data);
      })
      .catch(error => {
        if (error.response.status === 403) {
          alert("접근 권한이 없습니다. 로그인 후 다시 접속해 주세요.");
        }
      });
  }, []);



  return (
    <>
      <div id="my-modal" className={style.modal} ref={modalChange}>
        <div className={style.modalcontent}>
          <span class={style.close} onClick={closeModal}>
            &times;
          </span>
          {
            datas && datas.map(notify => (
              <div key={notify.notifyNum}>
                <div className={style.modalheader}>
                  <img src={require("../../source/img/big_warn.png")} alt="2" />
                  <h2 className={style.title}>접수된 신고 내용</h2>
                  <h3 className={style.member}>신고자: 시흥기린</h3>
                </div>
                <div className={style.modalbody}>
                  <div className={style.seller}>
                    <h3 className={style.seller}>판매자</h3>
                    <h3>asd@naver.com</h3>
                  </div>
                  <div className={style.category}>
                    <h3 className={style.title}>제목</h3>
                    <h3>상품 상태 불량</h3>
                  </div>
                </div>
                <div className={style.message}>
                  <p>
                    이곳은 신고 내용을 작성하는곳입니다.
                    여기에는 온갖 별의별 내용의 신고가 작성될거 같은데 이걸 쓰는 사람이 과연 있을까 싶기도 하고
                    뭔지 모르겠네요 하..
                  </p>
                </div>
              </div>
            ))
          }
          <div className={style.modalfooter}>
            <button type="button" className={style.redBtn}>
              접수확인
            </button>
            <button onClick={closeModal} type="text" id="outMan">
              보류
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notify;
