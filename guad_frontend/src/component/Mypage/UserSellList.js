import style from "../../source/Mypage.module.css";
import { useEffect, useState, useRef } from "react";
import sell_1 from "../../source/img/selling_item_ex1.png";
import sell_2 from "../../source/img/selling_item_ex2.png";
import axios from "axios";
import BuyReview from "../Moodal/BuyReview";

import '../../source/test.css';

function UserSellList() {
  const [sellList, setSellList] = useState([]);

  // const [ btnColor, setBtnColor ] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/selllist`).then((response) => {
      setSellList(response.data);
      console.log(sellList);
      console.log(sellList[1].sellState)
      // color();
    });
  }, []);

  // const colorChange = useRef();
  // const color = () => {
  //   if (sellList.sellState === "waiting") {
  //     colorChange.current.style = "background-color : #253C76";
  //   } else if (sellList.sellState === "ing") {
  //     colorChange.current.style = "background-color : #D9D9D9";
  //   } else if (sellList.sellState === "sold") {
  //     colorChange.current.style = "background-color : #217A4F";
  //   } else {
  //     colorChange.current.style = "background-color : #BA101E";
  //   }
  // };

  

  return (
    <>
      <div className={style.category}>
        <h3>판매 내역</h3>
      </div>

      <div className={style.sell_list_all}>
        {/* <div className={style.no_sell_info}>
            <button>상품 구매하러 가기</button>
          </div>  */}

        {/* {sellList && ( */}
        {/* 거래완료 */}
        {sellList &&
          sellList.map((list, index) => (
            <div className={style.sell_list}>
              <div className={style.item_bb}>
                <img src={sell_1} alt="1"></img>
                <img
                  src={require("../../source/img/del2.png")}
                  alt="1"
                  className={style.del_icon}
                ></img>
              </div>
              <div className={style.sell_list_info} key={list.itemSub}>
                <h3>
                  <strong>상품명 : </strong>
                  {list.itemSub}
                </h3>
                <h3>
                  <strong>가격 : </strong>
                  {list.itemPrice}
                </h3>
                <h3>
                  <strong>주소 : </strong>
                  {list.address}
                </h3>
                <h3>
                  <strong>구매자 연락처 : </strong>
                  {list.buyerPhone}
                </h3>
              </div>
              <div className={style.sellcheck}>
                <button className={list.sellState}>
                  {list.sellState}
                </button>
                <h3>
                  <strong>구매 일자 : </strong>{list.soldDate}
                </h3>
              </div>
            </div>
          ))}
        {/* 거래중 */}
      </div>
    </>
  );
}

export default UserSellList;
