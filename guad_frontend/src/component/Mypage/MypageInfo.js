import style from "../../source/MypageInfo.module.css";
import logo from "../../source/img/mypage.png";
import MoodalMileage from "../Moodal/Mileage";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AddressApi from "../Moodal/AddressApi";
import { Link } from "react-router-dom";

function MypageInfo(props) {
  const [data, setData] = useState({
    email: "",
    pass: "",
    nickname: "",
    phone: "",
    address: "",
    mileage: "",
  });

  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [isPass, setIsPass] = useState(false);
  const [isPassConfirm, setIsPassConfirm] = useState(false);
  // const [isPhone, setIsPhone] = useState(false);
  // const [isAddress, setIsAddress] = useState(false);
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
  /// 탈퇴용
  const HandlerDelete = () => {
    if (window.confirm("오르내림 회원을 탈퇴 하시겠습니까?")) {
      axios
        .post(
          `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member/delete`,
          { email: userEmail }
        )
        .then((response) => {
          alert("회원 탈퇴되었습니다.");
          sessionStorage.clear();
          props.setIsLogin(false);
          props.history.push("/login");
        });
    } else {
      console.log("취소");
    }
  };

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`)
      .then((response) => {
        console.log(response.data);
        setData({
          email: response.data.email,
          nickname: response.data.nickname,
          phone: response.data.phone,
          address: response.data.address,
          addressDetail: response.data.addressDetail,
          mileage: response.data.mileage,
        });
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setUserEmail(response.data.email);
      });
  }, []);

  const handlerUpdate = () => {
    if (!(isPass && isPassConfirm)) {
      alert("두 비밀번호가 일치하지 않습니다.");
    } else {
      axios
        .post(
          `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member/update`,
          {
            phone,
            address,
            addressDetail,
            pass,
            email: userEmail,
          }
        )
        .then((response) => {
          alert("수정이 완료되었습니다.");
          props.history.push("/mypage");
        });
    }
  };
  const warn = () => {
    alert("정보 수정을 완료해주세요!");
  };

  // 주소API
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev); // false > true
  };
  console.log(address);
  console.log(phone);
  return (
    <>
      <MoodalMileage />
      <div className={style.All_Mboxi}>
        <Link to="/mypage">
          <h1 className={style.page_namei}>마이페이지</h1>
        </Link>
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
                현재 마일리지 <strong>{data.mileage.toLocaleString()}</strong>원
              </h3>
            </div>
            <div className={style.Mbox_button}>
              <ul>
                <li>
                  <button className={style.member} type="button"></button>
                  <p>회원정보</p>
                </li>
                <li>
                  <button className={style.mileage} type="button"></button>
                  <p>마일리지</p>
                </li>
                <li>
                  <button type="button"></button>
                  <p>신고내역</p>
                </li>
              </ul>
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
            <input defaultValue={address} onChange={changeAddress} readOnly />
            <button className={style.searchi} onClick={onToggleModal}>
              검색
            </button>
          </div>
          <h3>상세주소</h3>
          <input defaultValue={data.addressDetail} />
          {isOpen && (
            <AddressApi
              visible={isOpen}
              onOk={onToggleModal}
              onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
              setAddress={setAddress}
            />
          )}
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
          <button
            type="button"
            className={`${style.getouti} ${style.btni}`}
            onClick={HandlerDelete}
          >
            회원탈퇴
          </button>
          <button
            type="button"
            className={`${style.updatei} ${style.btni}`}
            onClick={handlerUpdate}
          >
            정보수정
          </button>
        </div>
      </div>
    </>
  );
}

export default MypageInfo;
