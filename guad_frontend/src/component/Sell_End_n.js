import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Sell_End_n({ match, modalOpen }) {

  const [contents, setContents] = useState('');
  const [item, setItem] = useState('');
  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };
  const openModal = () => {
    modalChange.current.style = "display:block;";
  };
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

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sell/${match.params.itemNum}`
      )
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      });
  }, []);

  const handleSubmit = () => {
    axios.post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/review`, { itemNum: item.itemNum, sellerEmail: item.sellerEmail, writerNickname: item.nickname, contents, starPoint: rating })
      .then((response) => {
        console.log(response)
        alert("리뷰 작성이 완료되었습니다.")
        modalOpen.current.style = "display:none;"
      })
  }

  const onChange = (e) => {
    setContents(e.target.value)
  }

  return (
    <>
      <NotifyWrite
        closeModal={closeModal}
        modalChange={modalChange}
        itemNum={item.itemNum}
      />
      <div className={style.item_top}>
        <h2 className={style.normal}>
          <strong>일반</strong>판매
        </h2>
        <div className={style.img_item}>
          <img
            src={require("../source/img/big_item.png")}
            alt="제품사진"
            className={style.item}
          />
          <span className={style.up1}>판매종료</span>
          <img
            src={require("../source/img/del3_b.png")}
            alt="경매끝"
            className={style.up2}
          />
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className={style.info_top}>
          <img
            src={require("../source/img/warn.png")}
            alt="신고"
            id="openMan"
            onClick={openModal}
          />
          <span className={style.top_head}>상품 정보</span>
          <span className={style.top_cate}>의류 / 가방</span>
          <span className={style.top_title}>디올 가방 재고 처리합니다!</span>
          <div className={style.rating_option}>
            <img src={require("../source/img/star.png")} alt="별점" />
            <span>4</span>
          </div>
          <div className={style.rating_option}>
            <img src={require("../source/img/see.png")} alt="조회수" />
            <span>33</span>
          </div>
          <div className={style.last_nn}>
            <h2>
              판매자 : <strong>시흥기린</strong>
            </h2>
            <p className={style.n_1}>
              배송비<strong>배송비 포함</strong>
            </p>
            <p className={style.n_2}>
              판매가<strong>450,000</strong>
            </p>
            <span>
              판매날짜 : <strong>2022년 3월 14일</strong>
            </span>
            <span className={style.nn_last22}>
              최종 입찰자 : <strong>부산물개</strong>
            </span>
          </div>
        </div>
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>
          따끈따끈한 신상 가방 재고 처리합니다.
          <br />
          상태는 A급 엄청 깔끔하게 관리했습니다.
          <br />
          많은 관심 부탁드립니다.
        </p>
        <div className={style.rating}>
          <h3>거래는 어떠셨나요?</h3>
          <div className={style.star}>
            <img
              src={
                rating == "1" ||
                  rating == "2" ||
                  rating == "3" ||
                  rating == "4" ||
                  rating == "5"
                  ? require("../source/img/rating1.png")
                  : require("../source/img/rating2.png")
              }
              alt="별점"
              name="1"
              onClick={ratingClick}
            />
            <img
              src={
                rating == "2" || rating == "3" || rating == "4" || rating == "5"
                  ? require("../source/img/rating1.png")
                  : require("../source/img/rating2.png")
              }
              alt="별점"
              name="2"
              onClick={ratingClick}
            />
            <img
              src={
                rating == "3" || rating == "4" || rating == "5"
                  ? require("../source/img/rating1.png")
                  : require("../source/img/rating2.png")
              }
              alt="별점"
              name="3"
              onClick={ratingClick}
            />
            <img
              src={
                rating == "4" || rating == "5"
                  ? require("../source/img/rating1.png")
                  : require("../source/img/rating2.png")
              }
              alt="별점"
              name="4"
              onClick={ratingClick}
            />
            <img
              src={
                rating == "5"
                  ? require("../source/img/rating1.png")
                  : require("../source/img/rating2.png")
              }
              alt="별점"
              name="5"
              onClick={ratingClick}
            />
          </div>
          <textarea placeholder="거래후기를 작성해주세요." onChange={onChange} value={contents}></textarea>
          <button type="button" onClick={handleSubmit}>작성</button>
        </div>
        <div className={style.sell_review}>
          <h2>판매자님에 대한 리뷰</h2>
          <img src={require("../source/img/red_star.png")} alt="붉은별" />
          <span>4</span>
        </div>
        <div className={style.sell_review_show}>
          <ul>
            <li>
              <span>수원 물고기</span>
              <img src={require("../source/img/gray_star.png")} alt="회색별" />
              <span>3</span>
              <span className={style.review_write}>이것은 리뷰여</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Sell_End_n;
