import Moodal from "./Moodal";
import style from "../source/Join.module.css";
import { useState } from "react";

function JoinG() {
  const [g_check, setG_check] = useState("");

  const CheckGen = (e) => {
    const gen = e.target.name;
    if (gen === "man") {
      setG_check("m");
    } else {
      setG_check("w");
    }
  };
  return (
    <>
      <Moodal />
      <div className={style.join_all}>
        <h2>오르내림 회원가입을 환영합니다!</h2>
        <h3>개인 정보 입력</h3>
        <div className={style.input_set}>
          <ul>
            <li className={style.nick_in}>
              <label>별명</label>
              <input type="text" placeholder="별명을 입력해주세요." />
              <button type="button">중복확인</button>
            </li>
            <li className={style.tel_in}>
              <label>전화번호</label>
              <input type="text" placeholder="-를 제외하고 입력해주세요." />
            </li>
            <li className={style.gen_in}>
              <label>성별</label>
              <button
                className={
                  g_check === "m" ? `${style.gen_true}` : `${style.gen_false}`
                }
                onClick={CheckGen}
                id={style.man}
                name="man"
              >
                남성
              </button>
              <button
                onClick={CheckGen}
                className={
                  g_check === "w" ? `${style.gen_true}` : `${style.gen_false}`
                }
                name="woman"
              >
                여성
              </button>
            </li>
            <li className={style.add_in}>
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
        <button className={style.last_btn}>회원가입</button>
      </div>
      <div></div>
    </>
  );
}
export default JoinG;
