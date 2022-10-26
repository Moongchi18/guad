import style from "../source/ManagerNotify.module.css";
import logo from "../source/img/mypage.png";
import sell_1 from "../source/img/selling_item_ex1.png";
import sell_2 from "../source/img/selling_item_ex2.png";

function M_Sample() {
  window.onload = function () {
    const modal = document.querySelector("#");
    const closeBtn1 = document.querySelector("#");
    const closeBtn2 = document.querySelector("#");
    const openBtn1 = document.querySelector("#open");

    closeBtn1.addEventListener("click", closeModal);
    closeBtn2.addEventListener("click", closeModal);

    openBtn1.addEventListener("click", openModal);


    function closeModal() {
      modal.style.display = "none";
    }
  
    function openModal() {
      modal.style.display = "block";
    }

  };
}




function ManagerNotify() {
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
          <h3>신고내역</h3>
        </div>

        <div className={style.notify}>

            
          <div className={style.notify_list}>
            <img src={sell_1} alt="1"></img>

            <h3>셀린느 폴코 트리오페...</h3>
          </div>

          <div className={style.notify_list}>
            <img src={sell_2} alt="1"></img>
            <h3>셀린느 폴코 트리오페...</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerNotify;
