import Terms from "./Moodal/Terms";
import style from "../source/Join.module.css";
import { useState } from "react";
import axios from "axios";


function JoinG({history}) {
  const [g_check, setG_check] = useState("");
  const CheckGen = (e) => {
    const gen = e.target.name;
    if (gen === "man") {
      setG_check("m");
    } else {
      setG_check("w");    }
  };
  
  var email = sessionStorage.getItem("email");
  
  console.log(email)
  const handlerGoogleJoin = () => {
    axios
      .post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`, { email, pass : '', nickname: nickname, phone: phone, address: address, gender: g_check })
      .then((response) => console.log(response))
    history.push("/")
      .catch((error) => console.log(error)); 
  };

  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isNickname, setIsNickname] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isUsableNickname, setIsUsableNickname] = useState(false);

  const [nicknameMessage, setNicknameMessage] = useState('');
  const [usableNicknameMessage, setUsableNicknameMessage] = useState('');

  const changeNickname = (e) => {
    setNickname(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 7) {
      setNicknameMessage('2글자 이상 7글자 미만으로 입력해주세요.')
      setIsNickname(false)
    } else {
      setNicknameMessage('올바른 별명 형식입니다 :)')
      setIsNickname(true)
    }
  }


  const changePhone = (e) => {
    setPhone(e.target.value)
    if (e.target.value.length > 0) {
      setIsPhone(true)
    }
  }

  const changeAddress = (e) => {
    setAddress(e.target.value)
    if (e.target.value.length > 0) {
      setIsAddress(true)
    }
  }

  const nicknameCheck = (e) => {
    console.log(nickname)
    console.log(sessionStorage.getItem("token"))
    e.preventDefault();
    axios
      .post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member/nicknamecheck`, JSON.stringify({ nickname: nickname }), { headers: { "Content-Type": 'application/json' } })
      .then((response) => {
        if (response.status === 200) {
          setUsableNicknameMessage("사용 가능한 아이디입니다.") 
          setIsUsableNickname(true)
        } 
      })
      .catch(error => {
          setIsUsableNickname(false)
          setUsableNicknameMessage("이미 사용중인 아이디 입니다.");      
      })
  }

  return (
    <>
      <Terms />
      <div className={style.join_all}>
        <h2>오르내림 회원가입을 환영합니다!</h2>
        <h3>개인 정보 입력</h3>
        <div className={style.input_set}>
          <ul>
            <li className={style.nick_in}>
              <label>별명</label>
              <input type="text" placeholder="별명을 입력해주세요." value={nickname} onChange={changeNickname} />
              <button type="button" onClick={nicknameCheck}>중복확인</button>
              {nickname.length > 0 && <p className="messeageDiv" style={isNickname ? { color: '#248f48' } : { color: '#ff2727' }}>{nicknameMessage}</p>}
              <p style={isUsableNickname ? { color: '#248f48' } : { color: '#ff2727' }}>{usableNicknameMessage}</p>
            </li>
            <li className={style.tel_in}>
              <label>전화번호</label>
              <input type="text" placeholder="-를 제외하고 입력해주세요." value={phone} onChange={changePhone} />
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
              <input type="text" value={address} onChange={changeAddress} />
              <button>검색</button>
            </li>
            <li>
              <label>상세주소</label>
              <input type="text" />
            </li>
          </ul>
        </div>
        <button className={style.last_btn} onClick={handlerGoogleJoin} disabled={!(isNickname && isPhone && isAddress)}>회원가입</button>
      </div>
      <div></div>
    </>
  );
}
export default JoinG;
