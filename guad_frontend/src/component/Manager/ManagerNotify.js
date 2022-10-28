import style from "../../source/ManagerNotify.module.css";
import logo from "../../source/img/mypage.png";
import sell_1 from "../../source/img/selling_item_ex1.png";
import sell_2 from "../../source/img/selling_item_ex2.png";
import MoodalNotify from "../Moodal/Notify";
function ManagerNotify() {
  
  window.onload = function () {
    // Get DOM Elements
    const modal = document.querySelector("#my-modal");

    const modalBtn = document.getElementsByClassName(`${style.notify_list}`);
    const closeBtn = document.querySelector("#close");
    console.log(modalBtn);
    // Events
    for(let i=0; i<modalBtn.length; i++)  {
      modalBtn[i].addEventListener("click", openModal);
    }
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", outsideClick);

    // Open
    function openModal() {
      modal.style.display = "block";
    }

    // Close
    function closeModal() {
      modal.style.display = "none";
    }

    // Close If Outside Click
    function outsideClick(e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    }
  };

  return (
    <>
      <MoodalNotify />
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
