import logo from "../source/img/mypage.png";
import logo_d from "../source/img/mypage_d.png";
import style from "../source/ManagerMember.module.css";

function ManagerMember() {
  return (
    <>
      <div className={style.All_Mbox}>
        <h1 className={style.page_name}>관리자 페이지</h1>
        <div>
          <div className={style.Mbox}>
            <div className={style.logo_box}>
              <img src={logo} alt="1"></img>
            </div>
            <div className={style.mileage_box}>
              <h3>
                <strong>관리자</strong>님 환영합니다!
              </h3>
            </div>
            <div className={style.Mbox_button}>
              <button className={style.member}>회원정보</button>
              <button className={style.mileage}>마일리지</button>
            </div>
          </div>
        </div>
        <div className={style.category}>
          <h3 className={style.list}>회원목록</h3>
          <h3 className={style.name}>닉네임</h3>
          <h3 className={style.id}>아이디</h3>
          <h3 className={style.address}>주소</h3>
        </div>

        <div className={style.user_detail}>
          <div className={style.user_list}>
            <div className={style.logo}>
              <img src={logo_d} alt="1"></img>
            </div>
            <div className={style.name}>
              <h3>시흥기린</h3>
            </div>
            <div className={style.id}>
              <h3>s5s5z@naver.com</h3>
            </div>
            <div className={style.address}>
              <h3>서울시 종로구 인사동길 12 대일빌등 7층 1번 강의실</h3>
            </div>
          </div>

          <div className={style.user_list}>
            <div className={style.logo}>
              <img src={logo_d} alt="1"></img>
            </div>
            <div className={style.name}>
              <h3>부산물개2222</h3>
            </div>
            <div className={style.id}>
              <h3>12345@naver.com</h3>
            </div>
            <div className={style.address}>
              <h3>부산광역시 부산진구 연수로 11번길 5722222222222222222</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ManagerMember;
