import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/Selling.module.css";
import ItemSuccess from "./Moodal/ItemSuccess";

function Selling() {
  const selectListAPeriod = [1, 2, 3, 5, 7];
  const selectListHour = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const now = new Date();
  let tempDate = new Date();
  
  const modalOpen = useRef();

  const closeModal = () => {
    modalOpen.current.style = "display:none;";
  };

  const [sellType, setSellType] = useState("");
  const [data, setData] = useState('');
  const [itemType, setItemType] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('대분류');
  const [itemDetailType, setItemDetailType] = useState([]);
  const [selectedItemDetailType, setSelectedItemDetailType] = useState('소분류');
  const [itemSub, setItemSub] = useState('');
  const [itemContents, setItemContents] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedHour, setSelectedHour] = useState(9);
  const [aPeriod, setAPeriod] = useState(new Date());
  const [aPeriodText, setAPeriodText] = useState(`${tempDate.getFullYear()}년 ${tempDate.getMonth()+1}월 ${tempDate.getDate()}일 ${selectedHour}시`);

  const refSellType = useRef();
  const refItemType = useRef();
  const refItemDetailType = useRef();
  const refItemSub = useRef();
  const refItemContents = useRef();
  const refItemPrice = useRef();
  const refAPeriod = useRef();
  const refImage = useRef();

  const handlerSellType = (e) => {
    const type = e.target.name;
    // type u : up / d : down / n : normal
    setSellType(type);
  };

  const handlerSelectedItemType = (e) => {
    setSelectedItemType(e.target.value);

    const newItemDetailType = [];
    data.forEach((element, index) => {
      if (element.itemType === e.target.value && element.itemDType !== "") {
        console.log(element.itemDType);
        newItemDetailType.push(element.itemDType);
      }
    });
    setItemDetailType(newItemDetailType);
    setSelectedItemDetailType("소분류");
  };
  const handlerSelectedItemDetailType = (e) =>
    setSelectedItemDetailType(e.target.value);
  const handlerItemSub = (e) => setItemSub(e.target.value);
  const handlerItemContents = (e) => setItemContents(e.target.value);
  const handlerItemPrice = (e) => setItemPrice(e.target.value);
  const handlerSelectedDay = (e) => {
    setSelectedDay(e.target.value)
    console.log(e.target.value)
    tempDate.setDate(now.getDate() + e.target.value * 1)
    setAPeriod(tempDate)
    setAPeriodText(`${tempDate.getFullYear()}년 ${tempDate.getMonth()+1}월 ${tempDate.getDate()}일 ${selectedHour}시`)
  };
  const handlerSelectedHour = (e) => {
    setSelectedHour(e.target.value)
    tempDate.setHours(e.target.value * 1)
    setAPeriod(tempDate)
    setAPeriodText(`${aPeriod.getFullYear()}년 ${aPeriod.getMonth()+1}월 ${aPeriod.getDate()}일 ${tempDate.getHours()}시`)
  }
  

  console.log("aPeriod 테스트 " + aPeriod.toISOString().slice(0, 10) + " " + aPeriod.toISOString().slice(11,13) + ":00:00");
  const handlerItemRegist = (e) => {
    e.preventDefault();
    if (sellType === "") {
      alert("거래종류를 선택하세요");
      refSellType.current.focus();
    } else if (selectedItemType === "대분류") {
      alert("대분류를 선택하세요");
      refItemType.current.focus();
    } else if (selectedItemDetailType === "소분류") {
      alert("소분류를 선택하세요");
      refItemDetailType.current.focus();
    } else if (itemSub === "" || itemSub === undefined) {
      alert("제목을 작성해주세요");
      refItemSub.current.focus();
    } else if (itemContents === "" || itemContents === undefined) {
      alert("내용을 작성해주세요");
      refItemContents.current.focus();
    } else if (
      itemPrice === "" ||
      itemPrice === undefined ||
      itemPrice === null
    ) {
      alert("가격을 입력하세요");
      refItemPrice.current.focus();
    } else if (aPeriod === "" || aPeriod === undefined || aPeriod === null) {
      alert("경매기간을 입력해주세요");
      refAPeriod.current.focus();
    }
    // else if(aPeriod < now) {
    //   alert("날짜비교 성공")
    // }
    else {
      axios.post("http://localhost:8080/sellitem",
        // memberEmail: '', // 컨트롤러에서 토큰으로 정보확인 후 입력
        // writeDate: '', // 쿼리문에 now()
        {
          sellType,
          itemSub,
          itemContents,
          itemPrice,
          itemType: selectedItemType,
          itemDType: selectedItemDetailType,
          aStartPrice: itemPrice,
          aaaPeriod: `${aPeriod.toISOString().slice(0, 10)} ${aPeriod.toISOString().slice(11,13)} :00:00`
          // aaaPeriod: "test"
        }
      )
        .then(response => {
          console.log(response)
          modalOpen.current.style = "display:block;";
        })
        .catch(error => {
          console.log(error)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 카테고리 불러오기
  useEffect(() => {
    axios.get("http://localhost:8080/category").then((response) => {
      // console.log(response.data);
      const temp1 = [];
      response.data.forEach((element) => temp1.push(element.itemType));
      const temp2 = temp1.filter(
        (element, index) => temp1.indexOf(element) === index
      );
      setItemType(temp2);
      setData(response.data);
    });
  }, []);
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
                ref={refSellType}
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
              <select
                className={style.select_one}
                onChange={handlerSelectedItemType}
                value={selectedItemType}
                ref={refItemType}
              >
                <option value="대분류">대분류</option>
                {itemType &&
                  itemType.map((type, index) => (
                    <option value={type} key={index}>
                      {type}
                    </option>
                  ))}
              </select>
              <select
                onChange={handlerSelectedItemDetailType}
                value={selectedItemDetailType}
                ref={refItemDetailType}
              >
                <option value="소분류">소분류</option>
                {itemDetailType &&
                  itemDetailType.map((detailType, index) => (
                    <option value={detailType} key={index}>
                      {detailType}
                    </option>
                  ))}
              </select>
            </li>
            <li>
              <label>판매글 제목</label>
              <input
                type="text"
                placeholder="판매글 제목을 작성해주세요."
                value={itemSub}
                onChange={handlerItemSub}
                ref={refItemSub}
              />
            </li>
            <li>
              <label>판매글 내용</label>
              <textarea
                placeholder="내용을 작성해주세요."
                value={itemContents}
                onChange={handlerItemContents}
                ref={refItemContents}
              ></textarea>
            </li>
            <li>
              <label>경매 시작가 / 판매 가격</label>
              <input
                type="text"
                placeholder="가격을 작성해주세요."
                value={itemPrice}
                onChange={handlerItemPrice}
                ref={refItemPrice}
              />
            </li>
            <li>
              <label>경매기간(익일부터 계산)</label>
              <select className={style.select_one} value={selectedDay} onChange={handlerSelectedDay}>
                {selectListAPeriod.map((day, index) => (
                  <option value={day} key={index}>
                    {day}일
                  </option>
                ))}
              </select>
              <br></br>
              <label>판매종료 시간</label>
              <select onChange={handlerSelectedHour} value={selectedHour}>
                {selectListHour.map((hour, index) => (
                  <option value={hour} key={index}>{hour >= 10 ? hour : '0' + hour}:00</option>
                ))}
              </select>
              <br></br>
              {/* <input type="datetime-local" value={aPeriod} onChange={handlerAPeriod} ref={refAPeriod} min={new Date()}></input> */}

              <span>경매 종료 : </span><input type="text" value={aPeriodText} ref={refAPeriod} disabled></input>
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
          <button
            type="button"
            className={style.subBtn}
            id="openMan"
            onClick={handlerItemRegist}
          >
            등록완료
          </button>
          {/* <Moodal2 closeModal={closeModal} modalOpen={modalOpen} /> */}
          <ItemSuccess closeModal={closeModal} modalOpen={modalOpen} />
        </div>
      </div>
    </>
  );
}
export default Selling;
