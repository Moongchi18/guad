import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import Up_After from "./Up_After";
import Up_Before from "./Up_Before";

function Sell_Up({match}) {
  const [nickname, setNickname] = useState("");
  const [start, setStart] = useState(false);
  const ClickStart = () => {
    if (sessionStorage.length != 0) {
      setStart(true);
    } else {
      alert("로그인해주세요!");
      setStart(false);
    }
  };
  const [itemNum, setItemNum] = useState(match.params.itemNum);
  console.log(itemNum)

  // useEffect(() => {
  //   setItemNum(document.getElementById(`${style.item_num}`).innerText);
  //   console.log(">>>>" + itemNum);
  // }, [sessionStorage.length]);

  console.log(">>>>" + itemNum);

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/member")
      .then((response) => {
        console.log(response.data.nickname);
        setNickname(response.data.nickname);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <NotifyWrite
        closeModal={closeModal}
        modalChange={modalChange}
        itemNum={itemNum}
      />
      <div id={style.item_num} className={style.item_num}>
        2
      </div>
      <div className={style.item_top}>
        <h2>
          <strong>오름</strong>판매
        </h2>
        <div className={style.img_item}>
          <img
            src={require("../source/img/big_item.png")}
            alt="제품사진"
            className={style.item}
          />
          <img
            src={require("../source/img/del2_b.png")}
            alt="오름경매"
            className={style.up2}
          />
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        {start == false && (
          <Up_Before openModal={openModal} ClickStart={ClickStart} />
        )}
        {start == true && (
          <Up_After openModal={openModal} nickname={nickname} itemNum={itemNum}/>
        )}
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
      </div>
    </>
  );
}
export default Sell_Up;
