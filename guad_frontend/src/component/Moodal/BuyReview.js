import { useState } from "react";
import style from "../../source/BuyReview.module.css";

function BuyReview({ modalOpen, closeModal }) {
  const [rating, setRating] = useState("");
  const ratingClick = (e) => {
    const star = e.target.name;
    if (star == "1") {
      setRating("1");
    } else if (star == "2") {
      setRating("2");
    } else if (star == "3") {
      setRating("3");
    } else if (star == "4") {
      setRating("4");
    } else {
      setRating("5");
    }
  };

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
              <img
                src={
                  rating == "1" ||
                  rating == "2" ||
                  rating == "3" ||
                  rating == "4" ||
                  rating == "5"
                    ? require("../../source/img/rating1.png")
                    : require("../../source/img/rating2.png")
                }
                alt="별점"
                name="1"
                onClick={ratingClick}
              />
              <img
                src={
                  rating == "2" ||
                  rating == "3" ||
                  rating == "4" ||
                  rating == "5"
                    ? require("../../source/img/rating1.png")
                    : require("../../source/img/rating2.png")
                }
                alt="별점"
                name="2"
                onClick={ratingClick}
              />
              <img
                src={
                  rating == "3" || rating == "4" || rating == "5"
                    ? require("../../source/img/rating1.png")
                    : require("../../source/img/rating2.png")
                }
                alt="별점"
                name="3"
                onClick={ratingClick}
              />
              <img
                src={
                  rating == "4" || rating == "5"
                    ? require("../../source/img/rating1.png")
                    : require("../../source/img/rating2.png")
                }
                alt="별점"
                name="4"
                onClick={ratingClick}
              />
              <img
                src={
                  rating == "5"
                    ? require("../../source/img/rating1.png")
                    : require("../../source/img/rating2.png")
                }
                alt="별점"
                name="5"
                onClick={ratingClick}
              />
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
