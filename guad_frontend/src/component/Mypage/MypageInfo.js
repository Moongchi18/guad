import style from "../../source/MypageInfo.module.css";
import logo from "../../source/img/mypage.png";
import MoodalMileage from "../Moodal/Mileage";
import axios from "axios";
import { useEffect, useState } from "react";

function MypageInfo({ history }) {

  const [data, setData] = useState({
    email: '',
    pass: '',
    nickname: '',
    phone: '',
    address: '',
    mileage: ''
  })

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');

  const changeAddress = (e) => {
    setAddress(e.target.value)
    console.log(e.target.value)
  }
  const changePass = (e) => {
    setPass(e.target.value)

  }

  const changePhone = (e) => {
    setPhone(e.target.value)
  }

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
          mileage: response.data.mileage,
          pass: response.data.pass
        })
      })   
  }, [])

  const handlerUpdate = () => {
    axios
      .put("http://localhost:8080/member", { address })
      .then(response => {
        //   setData({
        //    phone: response.data.phone,
        //    address: response.data.address       
        //  })
        alert("수정이 완료되었습니다.")
        history.push("/mypage/info")

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
            <input defaultValue={data.address} onChange={changeAddress}></input>
            <button className={style.searchi}>검색</button>
          </div>
          <h3>상세주소</h3>
          <input defaultValue={"대일빌딩 7층 1번 강의실"}></input>
          <h3>전화번호</h3>
          <input type="text" />

          <h3>변경 비밀번호</h3>
          <input type="password" />
          <h3>비밀번호 확인</h3>
          <input type="password" />
        </div>
        <button className={style.updatei} onClick={handlerUpdate}>정보수정</button>
      </div>
    </>
  );
}

export default MypageInfo;
