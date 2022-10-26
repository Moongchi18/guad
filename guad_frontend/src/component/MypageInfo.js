import style from "../source/MypageInfo.module.css";
import logo from "../source/img/mypage.png";

function MypageInfo() {
  return (
    <>
      <div className={style.All_Mboxi}>
        <h1 className={style.page_namei}>마이페이지</h1>
        <div>
          <div className={style.Mboxi}>
            <div className={style.logo_boxi}>
              <img src={logo} alt="1"></img>
            </div>
            <div className={style.mileage_boxi}>
              <h3>
                <strong>시흥 기린</strong>님 환영합니다!
              </h3>
              <h3>
                현재마일리지 <strong>1,000,000</strong>원
              </h3>
            </div>
            <div className={style.Mbox_buttoni}>
              <button className={style.memberi}>회원정보</button>
              <button className={style.mileagei}>마일리지</button>
            </div>
          </div>
        </div>
        <div className={style.categoryi}>
          <h3>회원정보 수정</h3>
        </div>
        <div className={style.member_infoi}>
          <div>
            <h3 className={style.fixi}>아이디</h3>
            <h3>s5s5z@naver.com</h3>
            <h3 className={style.fixi}>닉네임</h3>
            <h3>시흥기린</h3>
          </div>
          <div>
            <h3 className={style.addressi}>주소</h3>
            <input defaultValue={"서울시 종로구 인사동 12"}></input>
            <button className={style.searchi}>검색</button>
          </div>
          <h3>상세주소</h3>
          <input defaultValue={"대일빌딩 7층 1번 강의실"}></input>
          <h3>기존 비밀번호</h3>
          <input></input>
          <h3>변경 비밀번호</h3>
          <input></input>
          <h3>비밀번호 확인</h3>
          <input></input>
        </div>
        <button className={style.updatei}>정보수정</button>
      </div>
    </>
  );
}

export default MypageInfo;
