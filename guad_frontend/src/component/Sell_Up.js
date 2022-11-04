import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import Up_After from "./Up_After";
import Up_Before from "./Up_Before";

function Sell_Up({match}) {
  const [nickname, setNickname] = useState("");
  const [start, setStart] = useState(false);
  const [item, setItem] = useState({});
  const [review, setReview] = useState([]);
  const [auctionPeriodText, setAcutionPeriodText] = useState();
  const [presentPrice, setPresentPrice] = useState(0);
  const [price, setPrice] = useState(0);

  const clickStart = () => {
    if (sessionStorage.length != 0) {
      setStart(true);
    } else {
      alert("로그인해주세요!");
      setStart(false);
    }
  };
  console.log(item.itemNum)


  console.log(presentPrice);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/sellitem/${match.params.itemNum}`)
      .then((response) => {
        console.log(response.data);

        setItem(response.data);
        const tempPrice =
        response.data.sellType === "n"
        ? response.data.itemPrice
        : response.data.auctionStartPrice;
        setPresentPrice(tempPrice.toLocaleString());
        setPrice(tempPrice);
        
        const date = new Date(
          response.data.auctionPeriod.slice(0, 10) +
            " " +
            response.data.auctionPeriod.slice(12, 19)
        );
        date.setHours(date.getHours() + 9);
        setAcutionPeriodText(
          `${date.getFullYear()}년 ${
            date.getMonth() + 1
          }월 ${date.getDate()}일 ${date.getHours()}시까지`
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:8080/review/${match.params.itemNum}`)
      .then((response) => {
        setReview(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(">>>>" + item.itemNum);

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  return (
    <>
      <NotifyWrite
        closeModal={closeModal}
        modalChange={modalChange}
        itemNum={item.itemNum}
      />
      <div id={style.item_num} className={style.item_num}>
        {item.itemNum}
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
        {start == false && item &&(
          <Up_Before openModal={openModal} clickStart={clickStart} item={item}/>
        )}
        {start == true && item &&(
          <Up_After openModal={openModal} item={item}/>
        )}
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>
          {item.itemContents}
        </p>
      </div>
    </>
  );
}
export default Sell_Up;
