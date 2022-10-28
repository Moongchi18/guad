import React, { useEffect } from "react";
import style from "../../source/Moodal3.module.css";
function Moodal3({ closeModal, modalChange }) {
  useEffect(() => {}, []);
  return (
    <>
      <div className={style.modal} ref={modalChange}>
        <div className={style.modalcontent}>
          <div className={style.modalheader}>
            <img src={require("../../source/img/big_warn.png")} alt="2" />
            <h2>이 상품에 대해 신고하시겠습니까?</h2>
          </div>
          <div className={style.modalbody}>
            <input type="text" placeholder="제목을 입력해주세요." />
            <textarea placeholder="신고내용을 작성해주세요."></textarea>
          </div>
          <div className={style.modalfooter}>
            <button type="button" className={style.redBtn}>
              신고하기
            </button>
            <button type="text" onClick={closeModal}>
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Moodal3;
