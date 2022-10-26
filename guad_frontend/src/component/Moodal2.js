import React, { useEffect } from "react";
import style from "../source/Moodal2.module.css";

function Moodal2() {
  useEffect(() => {}, []);
  return (
    <>
      <div id="my-modal" className={style.modal}>
        <div className={style.modalcontent}>
          <div className={style.modalheader}>
            {/* 이건 닫기버튼 */}
            <span className={style.close} id="close">
              &times;
            </span>
            <h2>여긴 헤더입니다.</h2>
          </div>
          <div className={style.modalbody}>
            <h2>여긴 바디입니다.</h2>
          </div>
          <div className={style.modalfooter}>
            <h2>여긴 푸터입니다.</h2>
          </div>
        </div>
      </div>
    </>
  );
}
export default Moodal2;
