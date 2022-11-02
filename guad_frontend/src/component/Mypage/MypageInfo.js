import style from "../../source/MypageInfo.module.css";
import logo from "../../source/img/mypage.png";
import MoodalMileage from "../Moodal/Mileage";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function MypageInfo({ history }) {
  const [data, setData] = useState({
    email: "",
    pass: "",
    nickname: "",
    phone: "",
    address: "",
    mileage: "",
  });

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [email2, setEmail2] = useState("");

  const [isPass, setIsPass] = useState(false);
  const [isPassConfirm, setIsPassConfirm] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [passMessage, setPassMessage] = useState("");
  const [passConfirmMessage, setPassConfirmMessage] = useState("");

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeAddress = (e) => {
    setAddress(e.target.value);
    // if (e.target.value.length > 0) {
    //   setIsAddress(true)
    // }
  };

  const changePass = (e) => {
    setPass(e.target.value);
    const passRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passCurrent = e.target.value;
    setPass(passCurrent);

    if (!passRegex.test(passCurrent)) {
      setPassMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPass(false);
    } else {
      setPassMessage("안전한 비밀번호에요 : )");
      setIsPass(true);
    }
  };

  const changePassConfirm = (e) => {
    setPassConfirm(e.target.value);
    const passConfirmCurrent = e.target.value;
    setPassConfirm(passConfirmCurrent);

    if (pass === passConfirmCurrent) {
      setPassConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
      setIsPassConfirm(true);
    } else {
      setPassConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
      setIsPassConfirm(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/member")
      .then(response => {
        console.log(response.data)
        setData({
          email: response.data.email,
          nickname: response.data.nickname,
          phone: response.data.phone,
          address: response.data.address,
          mileage: response.data.mileage        
        })
        setUserEmail(response.data.email)
      })   
  }, [])

  const handlerUpdate = () => {
    console.log({phone, address, pass, userEmail})
    axios
      .post("http://localhost:8080/member/update", { phone, address, pass, email : userEmail })
      .then(response => {
       
        alert("수정이 완료되었습니다.")
        history.push("/mypage")

      })
  }
  return (
    <>
      <MoodalMileage />
      <div className={style.All_Mboxi}>
        <h1 className={style.page_namei}>마이페이지</h1>
        <div>
          <div className={style.Mboxi}>
            <div className={style.logo_boxi}>
              <img src={logo} alt="1"></img>
            </div>
            <div className={style.mileage_boxi}>
              <h3>
                <strong>{data.nickname}</strong>님 환영합니다!
              </h3>
              <h3>
                현재마일리지 <strong>{data.mileage}</strong>원
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
        <div className={style.member_infoi}>
          <div>
            <h3 className={style.fixi}>아이디</h3>
            <h3>{data.email}</h3>
            <h3 className={style.fixi}>닉네임</h3>
            <h3>{data.nickname}</h3>
          </div>
          <div>
            <h3 className={style.addressi}>주소</h3>
            <input defaultValue={data.address} onChange={changeAddress} />
            <button className={style.searchi}>검색</button>
          </div>
          <h3>상세주소</h3>
          <input defaultValue={"대일빌딩 7층 1번 강의실"} />
          <h3>전화번호</h3>
          <input defaultValue={data.phone} onChange={changePhone} />

          <h3>변경 비밀번호</h3>
          <input
            type="password"
            onChange={changePass}
            value={pass}
            placeholder="숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
          />
          {pass.length > 0 && (
            <p style={isPass ? { color: "#248f48" } : { color: "#ff2727" }}>
              {passMessage}
            </p>
          )}
          <h3>비밀번호 확인</h3>
          <input
            type="password"
            onChange={changePassConfirm}
            value={passConfirm}
            placeholder="변경할 비밀번호를 다시 입력해주세요!"
          />
          {passConfirm.length > 0 && (
            <p
              style={
                isPassConfirm ? { color: "#248f48" } : { color: "#ff2727" }
              }
            >
              {passConfirmMessage}
            </p>
          )}
        </div>
        <div className={style.btn_area}>
          <button type="button" className={`${style.getouti} ${style.btni}`}>
            회원탈퇴
          </button>
          <button
            type="button"
            className={`${style.updatei} ${style.btni}`}
            onClick={handlerUpdate}
            disabled={!(isPass && isPassConfirm)}
          >
            정보수정
          </button>
        </div>
      </div>
    </>
  );
}

export default MypageInfo;
