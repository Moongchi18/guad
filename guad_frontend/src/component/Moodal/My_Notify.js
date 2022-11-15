import axios from "axios";
import { useEffect, useState } from "react";
import style from "../../source/Moodal9.module.css";

function My_Notify({ modalChange3, closeModal3 }) {
  return (
    <>
      <div id="my-modal" className={style.modal} ref={modalChange3}>
        <div className={style.modalcontent}>
          <div className={style.modalheader}>
            <img src={require("../../source/img/warn3.png")} alt="경고" />
            <h3>신고내역</h3>
          </div>
          <div className={style.modalbody}>
            <div className={style.main_tag}>
              <p>제목 / 작성자</p>
              <p>내용</p>
            </div>
            <ul>
              <li>
                <div>
                  <span>이곳은 제목입니다!</span>
                  <span>user123@naver.com</span>
                </div>
                <p>
                  이 상품 뭔가 이상해요!!이 상품 뭔가 이상해요!!이 상품 뭔가
                  이상해요!!이 상품 뭔가 이상해요!!이 상품 뭔가 이상해요!!이
                  상품 뭔가 이상해요!!
                </p>
              </li>
              <li>
                <div>
                  <span>이곳은 제목입니다!</span>
                  <span>user123@naver.com</span>
                </div>
                <p>
                  이 상품 뭔가 이상해요!!이 상품 뭔가 이상해요!!이 상품 뭔가
                  이상해요!!이 상품 뭔가 이상해요!!이 상품 뭔가 이상해요!!이
                  상품 뭔가 이상해요!!
                </p>
              </li>
              <li>
                <div>
                  <span>이곳은 제목입니다!</span>
                  <span>user123@naver.com</span>
                </div>
                <p>
                  이 상품 뭔가 이상해요!!이 상품 뭔가 이상해요!!이 상품 뭔가
                  이상해요!!이 상품 뭔가 이상해요!!이 상품 뭔가 이상해요!!이
                  상품 뭔가 이상해요!!
                </p>
              </li>
              <li>
                <div>
                  <span>이곳은 제목입니다!</span>
                  <span>user123@naver.com</span>
                </div>
                <p>
                  이 상품 뭔가 이상해요!!이 상품 뭔가 이상해요!!이 상품 뭔가
                  이상해요!!이 상품 뭔가 이상해요!!이 상품 뭔가 이상해요!!이
                  상품 뭔가 이상해요!!
                </p>
              </li>
            </ul>
          </div>
          <div className={style.modalfooter}>
            <button type="button" onClick={closeModal3}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default My_Notify;
