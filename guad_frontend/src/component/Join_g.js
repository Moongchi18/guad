import Moodal from "./Moodal";
import "../source/Join.css";

function Join_g() {
  return (
    <>
      <Moodal />
      <div className="join_all">
        <h2>오르내림 회원가입을 환영합니다!</h2>
        <h3>개인 정보 입력</h3>
        <div className="input_set">
          <ul>
            <li className="nick_in">
              <label>별명</label>
              <input type="text" placeholder="별명을 입력해주세요." />
              <button type="button">중복확인</button>
            </li>
            <li className="tel_in">
              <label>전화번호</label>
              <input type="text" placeholder="-를 제외하고 입력해주세요." />
            </li>
            <li className="gen_in">
              <label>성별</label>
              <button className="man_b">남성</button>
              <button>여성</button>
            </li>
            <li className="add_in">
              <label>주소</label>
              <input type="text" />
              <button>검색</button>
            </li>
            <li>
              <label>상세주소</label>
              <input type="text" />
            </li>
          </ul>
        </div>
        <button className="last_btn">회원가입</button>
      </div>
      <div></div>
    </>
  );
}
export default Join_g;
