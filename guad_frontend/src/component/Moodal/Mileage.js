import style from "../../source/Moodal5.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Mileage({ closeModal, modalChange }) {
  const [data, setData] = useState({
    mileage: 0,
  });

  const [chargeMileage, setChargeMileage] = useState(0);
  const [totalMileage, setTotalMileage] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/member").then((response) => {
      setData({
        mileage: response.data.mileage,
      });
    });
  }, []);

  const changeMileage = (e) => {
    setChargeMileage(e.target.value);
    setTotalMileage(data.mileage*1 + e.target.value*1);
  };

  const handleCharge = () => {
    axios.post("http://localhost:8080/mileage", {chargeAmount : chargeMileage})
    .then(response => console.log(response)
    ,alert('마일리지 충전이 완료되었습니다'))
  }


  return (
    <>
      <div id="my-modal" class={style.modal} ref={modalChange}>
        <div class={style.modalcontent}>
          <span class={style.close} onClick={closeModal}>
            &times;
          </span>
          <div class={style.modalheader}>
            <h2>마일리지 충전</h2>
          </div>
          <div class={style.modalbody}>
            <div className={style.charge}>
              <h3 className={style.title}>충전금액</h3>
              <input
                type="text"
                value={chargeMileage}
                onChange={changeMileage}
              /> 
              <p>원</p>
            </div>
            <div className={style.mileageBox}>
              <div className={style.mileage}>
                <h3 className={style.title}>기존 마일리지</h3>
                <h3 className={style.number}>{data.mileage}</h3>
              </div>
              <div className={style.mileage}>
                <h3 className={style.title}>충전 마일리지</h3>
                <h3 className={style.number}>{chargeMileage}</h3>
              </div>
            </div>

            <div className={style.total}>
              <h3 className={style.title}>총 마일리지</h3>
              <h3 className={style.number}>{totalMileage}</h3>
            </div>
          </div>
          <div class={style.modalfooter}>
            <button onClick={handleCharge}>충전하기</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Mileage;
