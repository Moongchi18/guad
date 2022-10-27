import React, { useEffect, useState } from "react";
import style from "../source/Moodal.module.css";

function Moodal() {
  const [ccc1, setCcc1] = useState(false);
  const [ccc2, setCcc2] = useState(false);
  const [ccc3, setCcc3] = useState(false);
  const [ccc4, setCcc4] = useState(false);

  const modal = document.getElementById("my-modal");

  const changeImg1 = () => {
    if (ccc1 == false) {
      setCcc1(true);
    } else {
      setCcc1(false);
    }
  };
  const changeImg2 = () => {
    if (ccc2 == false) {
      setCcc2(true);
    } else {
      setCcc2(false);
    }
  };
  const changeImg3 = () => {
    if (ccc3 == false) {
      setCcc3(true);
    } else {
      setCcc3(false);
    }
  };
  const changeImg4 = () => {
    if (ccc4 == false) {
      setCcc4(true);
    } else {
      setCcc4(false);
    }
  };
  const closeModal = () => {
    if (ccc1 == false || ccc2 == false || ccc3 == false || ccc4 == false) {
      alert("동의를 확인해주세요.");
    } else {
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
            <span className={style.close} id="close" onClick={closeModal}>
              &times;
            </span>
            <h2>동의 약관 확인</h2>
          </div>
          <div className={style.modalbody}>
            <ul>
              <li>
                <button type="button" className={style.check_1}>
                  전체동의<strong> &#40;선택항목 포함&#41;</strong>
                  <span>
                    <img
                      src={
                        ccc1
                          ? require("../source/img/check01.png")
                          : require("../source/img/check00.png")
                      }
                      alt="체크"
                      id="cc1"
                      onClick={changeImg1}
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
                  <span>
                    <img
                      src={
                        ccc2
                          ? require("../source/img/check01.png")
                          : require("../source/img/check00.png")
                      }
                      alt="체크"
                      id="cc2"
                      onClick={changeImg2}
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
                  <span>
                    <img
                      src={
                        ccc3
                          ? require("../source/img/check01.png")
                          : require("../source/img/check00.png")
                      }
                      alt="체크"
                      id="cc3"
                      onClick={changeImg3}
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
                  <span>
                    <img
                      src={
                        ccc4
                          ? require("../source/img/check01.png")
                          : require("../source/img/check00.png")
                      }
                      alt="체크"
                      id="cc4"
                      onClick={changeImg4}
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
              onClick={closeModal}
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
