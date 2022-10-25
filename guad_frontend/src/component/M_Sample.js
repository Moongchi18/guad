import React, { useEffect } from "react";
import style from "../source/M_Sample.module.css";

function M_Sample() {
  window.onload = function () {
    const modal = document.querySelector("#my-modal");
    const closeBtn1 = document.querySelector("#close");
    const closeBtn2 = document.querySelector("#allcheckall");

    closeBtn1.addEventListener("click", closeModal);
    closeBtn2.addEventListener("click", closeModal);

    function closeModal() {
      modal.style.display = "none";
    }
  };

  useEffect(() => {
    (function openModal() {
      const modal = document.querySelector("#my-modal");
      modal.style.display = "block";
    })();
  }, []);
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
export default M_Sample;
