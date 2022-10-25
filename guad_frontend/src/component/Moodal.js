import React, { useEffect } from "react";
import "../source/Moodal.css";

function Moodal() {
  window.onload = function () {
    const modal = document.querySelector("#my-modal");
    const closeBtn1 = document.querySelector(".close");
    const closeBtn2 = document.querySelector(".all_check_all");

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
      <div id="my-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close">&times;</span>
            <h2>동의 약관 확인</h2>
          </div>
          <div className="modal-body">
            <ul>
              <li>
                <button type="button" className="check_1">
                  전체동의<strong> &#40;선택항목 포함&#41;</strong>
                  <button type="button">
                    <img
                      src={require("../source/img/check00.png")}
                      alt="체크"
                    />
                  </button>
                </button>
              </li>
              <li>
                <button type="button" className="check_2 check_9">
                  이용약관 동의 &#40;필수&#41;<strong> 보기</strong>
                  <button type="button">
                    <img
                      src={require("../source/img/check00.png")}
                      alt="체크"
                    />
                  </button>
                </button>
              </li>
              <li>
                <button type="button" className="check_3 check_9">
                  개인정보 수집 및 이용동의 &#40;필수&#41;
                  <strong> 보기</strong>
                  <button type="button">
                    <img
                      src={require("../source/img/check00.png")}
                      alt="체크"
                    />
                  </button>
                </button>
              </li>
              <li>
                <button type="button" className="check_4 check_9">
                  마케팅정보 이용 동의 추가 &#40;선택&#41;<strong> 보기</strong>
                  <button type="button">
                    <img
                      src={require("../source/img/check00.png")}
                      alt="체크"
                    />
                  </button>
                </button>
              </li>
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="all_check_all">
              동의확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Moodal;
