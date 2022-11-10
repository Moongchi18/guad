import style from "../../source/MypageInfo.module.css";
import logo from "../../source/img/mypage.png";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Mileage from "../Moodal/Mileage";



function MypageCheck({history}) {
  

  const [data, setData] = useState({
    nickname : '',
    mileage : 0
  });
  
  
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`)
      .then(response => {        
        setData({
          nickname : response.data.nickname,
          mileage: response.data.mileage        
        })        
      })   
  }, [])

  const [pass, setPass] = useState('');
  
  const changePass = (e) => {
    setPass(e.target.value);
  };

  const handleCheck = () => {
    axios
      .post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/mypage/passcheck`, { pass })
      .then((response) => history.push("/mypage/info"))
      .catch((error) => alert("비밀번호를 확인해주세요"));
  };

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  return (
    <>
      <Mileage closeModal={closeModal} modalChange={modalChange} />
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
                현재 마일리지 <strong>{data.mileage.toLocaleString()}</strong>원
              </h3>
            </div>
            <div className={style.Mbox_buttoni}>
              <button className={style.memberi}>회원정보</button>
              <button
                className={style.mileagei}
                id="mileage"
                onClick={openModal}
              >
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
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={changePass}
          />

          <button type="button" onClick={handleCheck} value={pass}>
            확인
          </button>
        </div>
      </div>
    </>
  );
}

export default MypageCheck;
