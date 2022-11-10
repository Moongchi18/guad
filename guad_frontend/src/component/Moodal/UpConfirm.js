import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../../source/Moodal8.module.css";

function UpConfirm({ closeModal2, modalChange2 }) {
  useEffect(() => {}, []);

  return (
    <>
      <div className={style.modal2} ref={modalChange2}>
        <div className={style.modalcontent2}>
          <div className={style.modalheader2}>
            <h2>입찰 내역</h2>
            <span className={style.close} onClick={closeModal2}>
              &times;
            </span>
          </div>
          <div className={style.modalbody2}>
            <div className={style.body_top}>
              <img
                src={require("../../source/img/big_item.png")}
                alt="아이템 사진"
              />
              <p className={style.tag1}>상품 정보</p>
              <p className={style.tag2}>디올 가방 재고 처리합니다!</p>
              <p className={style.tag3}>
                즉시 구매가 : <strong>450,000</strong>
              </p>
            </div>
            <div className={style.body_mid}>
              <p className={style.tag4}>
                내 마일리지 <strong>1,000,000</strong>
              </p>
              <p className={style.tag5}>
                상품 가격 <strong>-450,000</strong>
              </p>
            </div>
          </div>
          <div className={style.modalfooter3}>
            <h3>거래 결과</h3>
            <p className={style.tag6}>
              거래 후 마일리지<strong>550,000</strong>
            </p>
            <button type="button">입찰완료</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpConfirm;
