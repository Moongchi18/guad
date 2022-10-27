import React, { useEffect } from "react";
import style from "../source/Moodal6.module.css";

function Moodal6() {
  useEffect(() => {}, []);
  return (
    <>
      <div id="my-modal2" className={style.modal2}>
        <div className={style.modalcontent2}>
          <div className={style.modalheader2}>
            <h2>결제 내역</h2>
          </div>
          <div className={style.modalbody2}>
            <div className={style.info_b}>
              <img src={require("../source/img/item01.png")} alt="상품이미지" />
              <div className={style.info_in}>
                <span className={style.info1}>상품 정보</span>
                <span className={style.info2}>디올 가방 재고 처리합니다!</span>
                <span className={style.info3}>상품 가격</span>
                <span className={style.info4}>450,000</span>
              </div>
            </div>
            <div className={style.info_c}>
              <span>
                내 마일리지<strong>1,000,000</strong>
              </span>
              <span>
                상품 가격<strong>- 450,000</strong>
              </span>
            </div>
            <div className={style.info_d}>
              <span>배송 정보</span>
              <div className={style.input_b1}>
                <label>주소</label>
                <input type="text" className={style.input1} />
                <button type="button">검색</button>
              </div>
              <div className={style.input_b2}>
                <label>상세주소</label>
                <input type="text" className={style.input2} />
              </div>
            </div>
          </div>
          <div className={style.modalfooter2}>
            <button type="button" className={style.redBtn2}>
              신고하기
            </button>
            <button type="text" id="outMan2">
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Moodal6;
