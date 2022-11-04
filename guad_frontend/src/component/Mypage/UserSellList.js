import style from "../../source/Mypage.module.css";
import { useEffect, useState } from "react";
import sell_1 from "../../source/img/selling_item_ex1.png";
import sell_2 from "../../source/img/selling_item_ex2.png";
import axios from "axios";

function UserSellList() {

  const [sellList, setSellList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/selllist`)
      .then(response => {        
        console.log(response)
        setSellList(response.data)               
      })   
  }, [])



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
        {sellList && sellList.map((list, index) => (
        <div className={style.sell_list}>
          <div className={style.item_bb}>
            <img src={sell_1} alt="1"></img>
            <img
              src={require("../../source/img/del2.png")}
              alt="1"
              className={style.del_icon}
            ></img>
          </div>
          <div className={style.sell_list_info}>
            <h3>
              <strong>상품명 : </strong>{list.itemSub}
            </h3>
            <h3>
              <strong>가격 : </strong>{list.itemPrice}
            </h3>
            <h3>
              <strong>주소 : </strong>{list.address}
            </h3>
            <h3>
              <strong>구매자 연락처 : </strong>01044443333
            </h3>
          </div>
          <div className={style.sellcheck}>
            <button className={style.button}>거래완료</button>
            <h3>
              <strong>구매 일자 : </strong>2022년 10월 24일
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
