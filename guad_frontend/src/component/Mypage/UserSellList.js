import style from "../../source/Mypage.module.css";
import { useEffect, useState, useRef } from "react";
import sell_1 from "../../source/img/selling_item_ex1.png";
import sell_2 from "../../source/img/selling_item_ex2.png";
import axios from "axios";
import BuyReview from "../Moodal/BuyReview";

import "../../source/test.css";
import { Link } from "react-router-dom";

function UserSellList({ history }) {
  const [sellList, setSellList] = useState([]);

  // const [ btnColor, setBtnColor ] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/selllist`).then((response) => {
      setSellList(response.data);
      console.log(typeof response.data[0].soldDate);
    });
  }, []);

  console.log(sellList);

  // color();
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
        <h3>
          판매 내역
          <Link to="/mypage/sellList">
            <strong>더보기</strong>
          </Link>
        </h3>
      </div>

      <div className={style.sell_list_all}>
        {/* <div className={style.no_sell_info}>
            <button>상품 구매하러 가기</button>
          </div>  */}

        {/* {sellList && ( */}
        {/* 거래완료 */}
        {sellList &&
          sellList.map((list) => (
            <div className={style.sell_list}>
              <div className={style.item_bb} key={list.itemNum}>
                <img
                  src={`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${list.itemImgName}`}
                  alt={"img" + list.itemNum}
                />
                <img
                  src={require("../../source/img/del2.png")}
                  alt="1"
                  className={style.del_icon}
                ></img>
              </div>
              <div className={style.sell_list_info}>
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
                <button className={list.sellState}>{list.sellState}</button>
                <h3>
                  <strong>구매 일자 : </strong>
                  {list.soldDate && list.soldDate.substring(0, 10)}
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
