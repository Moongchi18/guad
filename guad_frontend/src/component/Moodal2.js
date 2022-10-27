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
            <img src={require("../source/img/check03.png")} alt="2" />
          </div>
          <div className={style.modalbody}>
            <h2>상품 등록에 성공했습니다!</h2>
            <h3>판매목록에서 확인해보세요.</h3>
          </div>
          <div className={style.modalfooter}>
            <h2>상품명</h2>
            <img src={require("../source/img/Line.png")} alt="33" />
            <h3>개봉 후 1번 사용 무선 저소음 적축키보드</h3>
            <button type="button" id="outMan">
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Moodal2;
