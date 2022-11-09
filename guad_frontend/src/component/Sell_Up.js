import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import Up_After from "./Up_After";
import Up_Before from "./Up_Before";

function Sell_Up({ match }) {
  const [start, setStart] = useState(false);
  const [item, setItem] = useState({});

  const clickStart = () => {
    if (sessionStorage.length != 0) {
      setStart(true);
    } else {
      alert("로그인해주세요!");
      setStart(false);
    }
  };
  console.log(item.itemNum)


  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sellitem/${match.params.itemNum}`)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      })
      .catch((error) => console.log(error));
    axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/review/${match.params.itemNum}`)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
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
            src={item.itemImgName && `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgName}`}
            alt={"img" + item.notifyNum}
            className={style.item}
          />
          <img
            src={require("../source/img/del2_b.png")}
            alt="오름경매"
            className={style.up2}
          />
          <ul>
            <li>
              <img
                src={item.itemImgName && `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgName}`}
                alt={"img" + item.notifyNum}
                className={style.item}
              /></li>
            <li>
              <img
                src={item.itemImgNameSub2 && `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgNameSub2}`}
                alt={"img" + item.notifyNum}
                className={style.item}
              /></li>
            <li>
              <img
                src={item.itemImgNameSub3 && `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgNameSub3}`}
                alt={"img" + item.notifyNum}
                className={style.item}
              /></li>
          </ul>
        </div>
        {start == false && item && (
          <Up_Before openModal={openModal} clickStart={clickStart} item={item} />
        )}
        {start == true && item && (
          <Up_After openModal={openModal} item={item} />
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
