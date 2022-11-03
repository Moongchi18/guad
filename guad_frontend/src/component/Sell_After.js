import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "../source/Sell_After.module.css";
import BuyReview from "./Moodal/BuyReview";

function Sell_After({ history, match }) {

  const [item, setItem] = useState("");
  const [member, setMember] = useState('');
  
  useEffect(() => {
    axios.get(`http://localhost:8080/sellitem/${match.params.itemNum}`)
    .then((response) => {
      console.log(response.data);
      setItem(response.data);      
    });
    axios
      .get("http://localhost:8080/member")
      .then((response1) => {
      setMember(response1.data);
      })
  }, []);
  
  const modalOpen = useRef();

  const closeModal = () => {
    modalOpen.current.style = "display:none;";
  };
  const openModal = () => {
    modalOpen.current.style = "display:block;";
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/sellitem/${match.params.itemNum}`)
      .then(response => {
        console.log(response.data)
        setItem(response.data)
      })
      .catch(error => console.log(error))
  }, [])


  return (
    <>
      <BuyReview closeModal={closeModal} modalOpen={modalOpen} />
      <div className={style.cont1}>
        <h2>구매 확인</h2>
        <div className={style.top}>
          <img src={require("../source/img/check03.png")} alt="체크" />
          <p>성공적으로 거래되었습니다.</p>
          <button type="button" onClick={openModal}>
            상품 리뷰하기
          </button>
        </div>
      </div>
      <div className={style.cont2}>
        <img src={require("../source/img/big_item.png")} alt="제품사진" />
        <div class={style.right_side}>
          <span className={style.category}>
            <p>{item.itemType}</p>
          </span>
          <span className={style.title}>{item.itemSub}</span>
          <span className={style.title}>{item.itemContents}</span>
          <p className={style.add}>
            배송주소<strong>{member.address}</strong>
          </p>
          <p className={style.seller}>
            판매자 : <strong>{item.nickname}</strong>
          </p>
          <p className={style.del}>
            배송비<strong>배송비 포함</strong>
          </p>
          <p className={style.price}>
            판매가<strong>{item.price}</strong>
          </p>
        </div>
      </div>
      <div className={style.btn_area}>
        <Link to="/mypage">
          <button type="button" className={style.my}>
            마이 페이지로 가기
          </button>
        </Link>
        <Link to="/sell_list">
          <button type="button" className={style.go}>
            쇼핑 계속하기
          </button>
        </Link>
      </div>
    </>
  );
}
export default Sell_After;
