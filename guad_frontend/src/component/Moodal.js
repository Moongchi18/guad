import React, { useEffect } from "react";
import style from "../source/Moodal.module.css";

function Moodal() {
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
            <span className={style.close} id="close">
              &times;
            </span>
            <h2>동의 약관 확인</h2>
          </div>
          <div className={style.modalbody}>
            <ul>
              <li>
                <button type="button" className={style.check_1}>
                  전체동의<strong> &#40;선택항목 포함&#41;</strong>
                  <span type="button">
                    <img
                      src={require("../source/img/check00.png")}
                      alt="체크"
                    />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={[style.check_2, style.check_9].join("")}
                >
                  이용약관 동의 &#40;필수&#41;<strong> 보기</strong>
                  <span type="button">
                    <img
                      src={require("../source/img/check00.png")}
                      alt="체크"
                    />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={[style.check_3, style.check_9].join("")}
                >
                  개인정보 수집 및 이용동의 &#40;필수&#41;
                  <strong> 보기</strong>
                  <span type="button">
                    <img
                      src={require("../source/img/check00.png")}
                      alt="체크"
                    />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={[style.check_4, style.check_9].join("")}
                >
                  마케팅정보 이용 동의 추가 &#40;선택&#41;<strong> 보기</strong>
                  <span type="button">
                    <img
                      src={require("../source/img/check00.png")}
                      alt="체크"
                    />
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className={style.modalfooter}>
            <button
              type="button"
              className={style.allcheckall}
              id="allcheckall"
            >
              동의확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Moodal;
