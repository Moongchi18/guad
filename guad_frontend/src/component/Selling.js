import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/Selling.module.css";
import ItemSuccess from "./Moodal/ItemSuccess";

function Selling() {
  const selectListAPeriod = [1, 2, 3, 5, 7];
  const selectListHour = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const now = new Date();
  const tempDate = new Date();

  const modalOpen = useRef();

  const closeModal = () => {
    modalOpen.current.style = "display:none;";
  };

  const [sellType, setSellType] = useState('u'); // 판매방식 u : up, d : down, n : normal
  const [data, setData] = useState(''); // 서버에서 카테고리를 받아와서 담을 dto
  const [itemType, setItemType] = useState(''); // 상품 대분류
  const [selectedItemType, setSelectedItemType] = useState('대분류'); // 선택된 대분류
  const [itemDetailType, setItemDetailType] = useState([]); // 상품 소분류
  const [selectedItemDetailType, setSelectedItemDetailType] = useState('소분류'); // 선택된 소분류
  const [itemSub, setItemSub] = useState(''); // 상품 판매글 제목
  const [itemContents, setItemContents] = useState(''); // 상품 판매글 내용
  const [itemPrice, setItemPrice] = useState(''); // 일반판매 상품 가격
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 경매기간
  const [selectedHour, setSelectedHour] = useState(9); // 선택된 경매종료 시간
  const [auctionPeriod, setAuctionPeriod] = useState(new Date()); // 경매 종료 날짜 + 시간
  const [auctionPeriodText, setAuctionPeriodText] = useState(`${tempDate.getFullYear()}년 ${tempDate.getMonth() + 1}월 ${tempDate.getDate()}일 ${selectedHour}시`); // 경매 종료 날짜 + 시간 표시양식
  const [discountRate, setDiscountRate] = useState(''); // 내림경매 - 시간당 내릴 가격/비율
  const [discountMethod, setDiscountMethod] = useState(true); // 내림경매 방식 - 랜덤discount true/false

  const refSellType = useRef();
  const refItemType = useRef();
  const refItemDetailType = useRef();
  const refItemSub = useRef();
  const refItemContents = useRef();
  const refItemPrice = useRef();
  const refAPeriod = useRef();
  const refDiscountMethod = useRef();
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
    console.log(selectedHour)
    tempDate.setDate(now.getDate() + e.target.value * 1 + 1)
    tempDate.setHours(selectedHour)
    console.log("<<<<<<<<<<<" + tempDate)
    setAuctionPeriod(tempDate)
    setAuctionPeriodText(`${tempDate.getFullYear()}년 ${tempDate.getMonth() + 1}월 ${tempDate.getDate()}일 ${selectedHour === '24' ? 0 : selectedHour}시`)
  };
  const handlerSelectedHour = (e) => {
    setSelectedHour(e.target.value)
    tempDate.setDate(now.getDate() + selectedDay * 1 + 1)
    console.log(selectedDay)
    tempDate.setHours(e.target.value * 1)
    console.log("<<<<<<<<<<<" + tempDate)
    setAuctionPeriod(tempDate)
    setAuctionPeriodText(`${tempDate.getFullYear()}년 ${tempDate.getMonth() + 1}월 ${tempDate.getDate()}일 ${tempDate.getHours() === '24' ? 0 : tempDate.getHours()}시`)
  }
  const handlerDiscountMethod = (e) => {
    console.log(e.target.checked)
    setDiscountMethod(e.target.checked)
  }
  const handlerDiscountRate = (e) => {
    setDiscountRate(e.target.value)
  }

  console.log("auctionPeriod 테스트 " + auctionPeriod);
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
    } else if (auctionPeriod === "" || auctionPeriod === undefined || auctionPeriod === null) {
      alert("경매기간을 입력해주세요");
      refAPeriod.current.focus();
    } else {
      const dateDto = new Date(auctionPeriod.toISOString().slice(0, 10) + " " + (auctionPeriod.getHours()) + ":00:00");
      console.log(dateDto)

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
          auctionStartPrice: itemPrice,
          auctionPeriod: dateDto
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
  // console.log(refDiscountMethod.current.value)
  // console.log(refDiscountMethod.current.checked)

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
              <label>{sellType === 'n' ? '판매가격' : '경매 시작가격'}</label>
              <input
                type="text"
                placeholder="가격을 작성해주세요."
                value={itemPrice}
                onChange={handlerItemPrice}
                ref={refItemPrice}
              />
            </li>
            {sellType !== 'n' &&
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
                {/* <input type="datetime-local" value={auctionPeriod} onChange={handlerAPeriod} ref={refAPeriod} min={new Date()}></input> */}

                <span>경매 종료 : </span><input type="text" value={auctionPeriodText} disabled></input>
                <br></br>
                <span>auctionPeriod : </span><input type="text" value={auctionPeriod} disabled></input>
              </li>
            }
            {sellType === 'd' ?
              <li>
                <label>시간당 내릴 가격</label>
                <form>
                  <input type="radio" name="down" onChange={handlerDiscountMethod} value="고정내림" defaultChecked={true}></input>
                  <label>고정내림</label>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <input type="radio" name="down" value="랜덤내림" ></input>
                  <label>랜덤내림</label>
                </form>
                {/* {refDiscountMethod.current.checked ?
                  <input type="text"
                    value={discountRate}
                    onChange={handlerDiscountRate}
                    placeholder="내릴 가격을 입력하세요">
                  </input>
                  :
                  <textarea>랜덤내림이란? 경매시작 가격에서부터 최저가격까지 시간당 랜덤으로 하락해서 경매에 재미를 더하는 방법</textarea>

                } */}
              </li>
              : ''
            }
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
