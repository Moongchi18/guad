import style from "../../source/BuyReview.module.css";

function BuyReview({ modalOpen, closeModal }) {
  return (
    <>
      <div className={style.modal} ref={modalOpen}>
        <div className={style.modalcontent}>
          <div className={style.modalheader}>
            {/* 이건 닫기버튼 */}
            <span className={style.close} onClick={closeModal}>
              &times;
            </span>
            <img src={require("../../source/img/review.png")} alt="2" />
          </div>
          <div className={style.modalbody}>
            <div className={style.rating}>
              <img src={require("../../source/img/rating2.png")} alt="별점" />
              <img src={require("../../source/img/rating2.png")} alt="별점" />
              <img src={require("../../source/img/rating2.png")} alt="별점" />
              <img src={require("../../source/img/rating2.png")} alt="별점" />
              <img src={require("../../source/img/rating2.png")} alt="별점" />
            </div>
            <p className={style.ask}>얼마나 만족스러우셨나요?</p>
            <p className={style.seller}>
              판매자 : <strong>시흥기린</strong>
            </p>
            <textarea placeholder="거래 후기를 작성해주세요."></textarea>
          </div>
          <div className={style.modalfooter}>
            <button type="button">작성</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BuyReview;
