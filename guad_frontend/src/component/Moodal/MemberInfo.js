import style from "../../source/Moodal7.module.css";



function MemeberInfo({ modalChange, closeModal }) {

useEffect(() => {
  setItemNum(document.getElementById(`${style.item_num}`).innerText);
    
  },[])


  return (
    <>
      <div id="my-modal" className={style.modal} ref={modalChange}>
        <div className={style.modalcontent}>
          <div className={style.modalheader}>
            <img src={require("../../source/img/mypage_d2.png")} alt="아이콘" />
          </div>
          <div className={style.modalbody}>
            <ul>
              <li>
                <p className={style.front}>닉네임</p>
                <p className={style.back}>시흥기린</p>
              </li>
              <li>
                <p className={style.front}>아이디</p>
                <p className={style.back}>s678z@naver.com</p>
              </li>
              <li>
                <p className={style.front}>주소</p>
                <p className={style.back}>
                  서울시 종로구 인사동길 12 대일빌딩 7층 204동 307호
                </p>
              </li>
              <li>
                <p className={style.front}>전화번호</p>
                <p className={style.back}>01066664444</p>
              </li>
            </ul>
          </div>
          <div className={style.modalfooter}>
            <button className={style.out_btn}>회원강퇴</button>
            <button className={style.yet_btn} onClick={closeModal}>
              보류
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemeberInfo;
