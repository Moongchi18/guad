import axios from "axios";
import { useEffect, useState } from "react";
import style from "../source/Selling.module.css";
import Moodal2 from "./Moodal2";

function Selling() {
  window.onload = function () {
    const modal = document.getElementById("my-modal");
    const closeBtn1 = document.getElementById("close");
    const closeBtn2 = document.getElementById("outMan");
    const openBtn1 = document.getElementById("openMan");

    openBtn1.addEventListener("click", openModal);
    closeBtn1.addEventListener("click", closeModal);
    closeBtn2.addEventListener("click", closeModal);

    function closeModal() {
      modal.style.display = "none";
    }

    function openModal() {
      modal.style.display = "block";
    }
  };
  const [sellType, setSellType] = useState("");
  const [data, setData] = useState();
  const [itemType, setItemType] = useState();
  const [selectedItemType, setSelectedItemType] = useState();
  const [itemDetailType, setItemDetailType] = useState([]);
  const [selectedItemDetailType, setSelectedItemDetailType] = useState();

  const handlerSellType = (e) => {
    const type = e.target.name;
    // type u : up / d : down / n : normal
    setSellType(type)
  };

  const handlerSelectedItemType = (e) => {
    setSelectedItemType(e.target.value)

    data.forEach((element, index) => {
      if (element.itemType === e.target.value) {
        console.log(element.itemDType);
        itemDetailType.push(element.itemDType)
      }
    })
    setItemDetailType(itemDetailType);
  };
  const handlerSelectedItemDetailType = (e) => setSelectedItemDetailType(e.target.value);
  console.log(itemDetailType)
  useEffect(() => {
    axios.get("http://localhost:8080/category").then((response) => {
      console.log(response.data);
      const temp1 = [];
      response.data.forEach((element) => temp1.push(element.itemType));
      const temp2 = temp1.filter(
        (element, index) => temp1.indexOf(element) === index
      );
      setItemType(temp2);
      setData(response.data)
    });
  }, []);
  console.log(selectedItemType);
  return (
    <>
      <div className={style.all_box}>
        <h2>내 상품 등록하기</h2>
        <div className={style.in_box}>
          <ul>
            <li>
              <label>거래종류</label>
              <button
                type="button"
                id={
                  sellType === "u"
                    ? `${style.button_active}`
                    : `${style.button_no}`
                }
                name="u"
                onClick={handlerSellType}
              >
                오름 경매
              </button>
              <button
                type="button"
                id={
                  sellType === "d"
                    ? `${style.button_active}`
                    : `${style.button_no}`
                }
                className={style.mid}
                name="d"
                onClick={handlerSellType}
              >
                내림 경매
              </button>
              <button
                type="button"
                id={
                  sellType === "n"
                    ? `${style.button_active}`
                    : `${style.button_no}`
                }
                name="n"
                onClick={handlerSellType}
              >
                일반 판매
              </button>
            </li>
            <li>
              <label>카테고리</label>
              <select className={style.select_one} onChange={handlerSelectedItemType} value={selectedItemType}>
                <option value="대분류">대분류</option>
                {itemType &&
                  itemType.map((type, index) => (
                    <option value={type} key={index}>
                      {type}
                    </option>
                  ))}
              </select>
              <select onChange={handlerSelectedItemDetailType} value={selectedItemDetailType}>
                <option value="소분류">소분류</option>
                {
                  itemDetailType &&
                  itemDetailType.map((detailType, index) => (
                    <option value={detailType} key={index}>{detailType}</option>
                  ))
                }
              </select>
            </li>
            <li>
              <label>판매글 제목</label>
              <input type="text" placeholder="판매글 제목을 작성해주세요." />
            </li>
            <li>
              <label>판매글 작성</label>
              <textarea placeholder="판매글을 작성해주세요."></textarea>
            </li>
            <li>
              <label>경매 시작가 / 판매 가격</label>
              <input type="text" placeholder="가격을 작성해주세요." />
            </li>
            <li>
              <label>경매기간 / 판매기간</label>
              <select>
                <option></option>
              </select>
            </li>
            <li>
              <label>사진등록</label>
              <p>필수로 1장 이상의 사진을 등록해야 합니다.</p>
              <div>
                <img src={require("../source/img/pic.png")} alt="사진1" />
                <img
                  src={require("../source/img/pic.png")}
                  alt="사진2"
                  className={style.mid_imgg}
                />
                <img src={require("../source/img/pic.png")} alt="사진3" />
              </div>
            </li>
          </ul>
          <button type="button" className={style.subBtn} id="openMan">
            등록완료
          </button>
          <Moodal2 />
        </div>
      </div>
    </>
  );
}
export default Selling;
