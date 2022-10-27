import style from "../source/Join.module.css";
import Moodal from "./Moodal";
import { useState } from "react";
import axios from "axios";


function Join({ history }) {

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isUsableId, setIsUsableId] = useState(false);
  const [isUsableNickname, setIsUsableNickname] = useState(false);

  const [emailMessage, setEmailMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [usableIdMessage, setUsableIdMessage] = useState('');
  const [usableNicknameMessage, setUsableNicknameMessage] = useState('');



  const handlerJoin = () => {
    axios
      .post("http://localhost:8080/member", { email: email, nickname: nickname, pass: password, phone: phone, address: address })
      .then((response) => console.log(response))
    history.push("/login")
      .catch((error) => console.log(error));
  };

  const changeEmail = (e) => {

    setEmail(e.target.value);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
      setIsEmail(false)
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )')
      setIsEmail(true)
    }
  }
  const changePassword = (e) => {

    setPassword(e.target.value);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )')
      setIsPassword(true)
    }
  }

  const changePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    const passwordConfirmCurrent = e.target.value
    setPasswordConfirm(passwordConfirmCurrent)

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
      setIsPasswordConfirm(true)
    } else {
      setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
      setIsPasswordConfirm(false)
    }
  }
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

  const idCheck = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/member/idcheck", JSON.stringify({ email: email }), { headers: { "Content-Type": 'application/json' } })
      .then((response) => {
        if (response.status === 200) {
          setUsableIdMessage("사용 가능한 아이디입니다.") 
          setIsUsableId(true)
        } 
      })
      .catch(error => {
          setIsUsableId(false)
          setUsableIdMessage("이미 사용중인 아이디 입니다.");      
      })
  }

  const nicknameCheck = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/member/nicknamecheck", JSON.stringify({ nickname: nickname }), { headers: { "Content-Type": 'application/json' } })
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
      <Moodal />
      <div className={style.join_all}>
        <h2>오르내림 회원가입을 환영합니다!</h2>
        <h3>개인 정보 입력</h3>
        <div className={style.input_set}>
          <ul>
            <li className={style.id_in}>
              <label>아이디</label>
              <input type="email" placeholder="아이디를 입력해주세요." value={email} onChange={changeEmail} />
              <button type="button" onClick={idCheck} >중복확인</button>
              {email.length > 0 && <p style={isEmail ? { color: '#248f48' } : { color: '#ff2727' }}>{emailMessage}</p>}
              <p style={isUsableId ? { color: '#248f48' } : { color: '#ff2727' }}>{usableIdMessage}</p>
            </li>
            <li className={style.nick_in}>
              <label>별명</label>
              <input type="text" placeholder="별명을 입력해주세요." value={nickname} onChange={changeNickname} />
              <button type="button" onClick={nicknameCheck}>중복확인</button>
              {nickname.length > 0 && <p className="messeageDiv" style={isNickname ? { color: '#248f48' } : { color: '#ff2727' }}>{nicknameMessage}</p>}
              <p style={isUsableNickname ? { color: '#248f48' } : { color: '#ff2727' }}>{usableNicknameMessage}</p>
            </li>
            <li className={style.pass_in}>
              <label>비밀번호</label>
              <input type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={changePassword} />
              {password.length > 0 && <p style={isPassword ? { color: '#248f48' } : { color: '#ff2727' }}>{passwordMessage}</p>}
            </li>
            <li className={style.check_in}>
              <label>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={passwordConfirm}
                onChange={changePasswordConfirm}
              />
              {passwordConfirm.length > 0 && <p style={isPasswordConfirm ? { color: '#248f48' } : { color: '#ff2727' }}>{passwordConfirmMessage}</p>}
            </li>
            <li className={style.tel_in}>
              <label>전화번호</label>
              <input type="text" placeholder="-를 제외하고 입력해주세요." value={phone} onChange={changePhone} />
            </li>
            <li className={style.gen_in}>
              <label>성별</label>
              <button className={style.man_b}>남성</button>
              <button>여성</button>
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
        <button className={style.last_btn} onClick={handlerJoin} disabled={!(isNickname && isEmail && isPassword && isPasswordConfirm && isPhone && isAddress)}>회원가입</button>
      </div>
      <div></div>
    </>
  );
}
export default Join;
