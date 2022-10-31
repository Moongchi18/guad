import style from "../../source/MypageInfo.module.css";
import logo from "../../source/img/mypage.png";
import { Link } from "react-router-dom";

function MypageCheck() {
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
              <button className={style.mileagei} id="mileage">
                마일리지
              </button>
            </div>
          </div>
        </div>
        <div className={style.categoryi}>
          <h3>회원정보 수정</h3>
        </div>
        <div className={style.check}>
          <label>정보를 수정하려면 비밀번호를 확인해주세요.</label>
          <input type="password" placeholder="비밀번호를 입력해주세요." />
          <Link to="/mypage/info">
            <button type="button">확인</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MypageCheck;
