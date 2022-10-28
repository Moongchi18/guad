import style from "../../source/Moodal5.module.css";
import { useEffect, useRef, useState } from "react";

function Mileage({closeModal, modalChange}) {


  return (
    <>
      <div id="my-modal" class={style.modal} ref={modalChange}>
        <div class={style.modalcontent}>
          <span class={style.close} onClick={closeModal}>
            &times;
          </span>
          <div class={style.modalheader}>
            <h2>마일리지 충전</h2>
          </div>
          <div class={style.modalbody}>
            <div className={style.charge}>
              <h3 className={style.title}>충전금액</h3>
              <strong>
                <h3>원</h3>
              </strong>
              <div className={style.numberBox}>
                <h3 className={style.number}>1,000,000</h3>
              </div>
            </div>
            <div className={style.mileageBox}>
              <div className={style.mileage}>
                <h3 className={style.title}>기존 마일리지</h3>
                <h3 className={style.number}>300,000</h3>
              </div>
              <div className={style.mileage}>
                <h3 className={style.title}>충전 마일리지</h3>
                <h3 className={style.number}>1,000,000</h3>
              </div>
            </div>

            <div className={style.total}>
              <h3 className={style.title}>총 마일리지</h3>
              <h3 className={style.number}>1,300,000</h3>
            </div>
          </div>
          <div class={style.modalfooter}>
            <button>충전하기</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Mileage;
