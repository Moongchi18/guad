import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/Selling.module.css";
import ItemSuccess from "./Moodal/ItemSuccess";

function Selling({ history }) {
  const selectListAPeriod = [1, 2, 3, 5, 7];
  const selectListHour = [
    9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  ];
  const now = new Date();
  const tempDate = new Date();

  const modalOpen = useRef();

  const closeModal = () => {
    modalOpen.current.style = "display:none;";
    history.push("/sell_list");
  };

  const [sellType, setSellType] = useState("u"); // 판매방식 u : up, d : down, n : normal
  const [data, setData] = useState(""); // 서버에서 카테고리를 받아와서 담을 dto
  const [itemType, setItemType] = useState(""); // 상품 대분류
  const [selectedItemType, setSelectedItemType] = useState("대분류"); // 선택된 대분류
  const [itemDetailType, setItemDetailType] = useState([]); // 상품 소분류
  const [selectedItemDetailType, setSelectedItemDetailType] =
    useState("소분류"); // 선택된 소분류
  const [itemSub, setItemSub] = useState(""); // 상품 판매글 제목
  const [itemContents, setItemContents] = useState(""); // 상품 판매글 내용
  const [itemPrice, setItemPrice] = useState(""); // 일반판매 상품 가격
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 경매기간
  const [selectedHour, setSelectedHour] = useState(9); // 선택된 경매종료 시간

  const [auctionMaxPrice, setAuctionMaxPrice] = useState(""); // 오름경매 - 즉시구매가격
  const [auctionMinPrice, setAuctionMinPrice] = useState(""); // 내림경매 - 최저가격, 시작가격 ~ 최저가격
  const [auctionPeriod, setAuctionPeriod] = useState(new Date()); // 경매 종료 날짜 + 시간
  const [auctionPeriodText, setAuctionPeriodText] = useState(
    `${tempDate.getFullYear()}년 ${tempDate.getMonth() + 1
    }월 ${tempDate.getDate() + 2}일 ${selectedHour}시`
  ); // 경매 종료 날짜 + 시간 표시양식
  const [auctionRandomMethod, setAuctionRandomMethod] = useState(false); // 내림경매 방식 - 랜덤discount true/false
  const [auctionDiscountPerHour, setAuctionDiscountPerHour] = useState(""); // 내림경매 - 시간당

  const refSellType = useRef();
  const refItemType = useRef();
  const refItemDetailType = useRef();
  const refItemSub = useRef();
  const refItemContents = useRef();
  const refItemPrice = useRef();

  const refAuctionMaxPrice = useRef();
  const refAuctionMinPrice = useRef();
  const refAuctionPeriod = useRef();
  const refAuctionRandomMethod = useRef();
  const refAuctionDiscountPerHour = useRef();
  const refImage = useRef();

  const handlerSellType = (e) => {
    // type u : up / d : down / n : normal
    setSellType(e.target.name);
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
  const handlerAuctionMaxPrice = (e) => setAuctionMaxPrice(e.target.value);
  const handlerSelectedDay = (e) => {
    setSelectedDay(e.target.value);
    tempDate.setDate(now.getDate() + e.target.value * 1 + 1);
    tempDate.setHours(selectedHour);
    setAuctionPeriod(tempDate);
    setAuctionPeriodText(
      `${tempDate.getFullYear()}년 ${tempDate.getMonth() + 1
      }월 ${tempDate.getDate()}일 ${selectedHour === "24" ? 0 : selectedHour}시`
    );
  };
  const handlerSelectedHour = (e) => {
    setSelectedHour(e.target.value);
    tempDate.setDate(now.getDate() + selectedDay * 1 + 1);
    tempDate.setHours(e.target.value * 1);
    setAuctionPeriod(tempDate);
    setAuctionPeriodText(
      `${tempDate.getFullYear()}년 ${tempDate.getMonth() + 1
      }월 ${tempDate.getDate()}일 ${tempDate.getHours() === "24" ? 0 : tempDate.getHours()
      }시`
    );
  };
  const nowText = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate() + 1}일 12시`;
  const handlerAuctionMinPrice = (e) => setAuctionMinPrice(e.target.value);
  const handlerAuctionRandomMethod = (e) => {
    if (e.target.value === "고정내림") {
      setAuctionRandomMethod(false);
    } else {
      setAuctionRandomMethod(true);
    }
  };
  const handlerAuctionDiscountPerHour = (e) => {
    setAuctionDiscountPerHour(e.target.value);
  };

  console.log("auctionMinPrice 테스트 " + auctionMinPrice);
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
    } else if (itemPrice === "") {
      alert("가격을 입력하세요");
      refItemPrice.current.focus();
    } else if (sellType === "u" && auctionMaxPrice === "") {
      alert("즉시구매가격을 입력하세요");
      refAuctionMaxPrice.current.focus();
    } else if (auctionPeriod === "") {
      alert("경매기간을 입력해주세요");
      refAuctionPeriod.current.focus();
    } else if (sellType === "d" && auctionMinPrice === "") {
      alert("최저가격을 입력해주세요");
      refAuctionMinPrice.current.focus();
    } else if (sellType === 'd' && !auctionRandomMethod && auctionDiscountPerHour === '') {
      alert("시간당 내릴 가격을 입력해주세요");
      refAuctionDiscountPerHour.current.focus();
    } else {
      const sellPrice = sellType === "n" ? itemPrice : "";
      const sendAuctionPeriod =
        sellType === "u" || sellType === "d" ? auctionPeriod : " ";
      const auctionStartPrice =
        sellType === "u" || sellType === "d" ? itemPrice : "";
      const sendAuctionMaxPrice = sellType === "u" ? auctionMaxPrice : "";
      const sendAuctionRandomMethod =
        sellType === "d" ? auctionRandomMethod : "";
      const sendAuctionDiscountPerHout =
        sellType === "d" && !auctionRandomMethod ? auctionDiscountPerHour : "";
      const sendAuctionMinPrice = sellType === "d" ? auctionMinPrice : "";

      axios
        .post(
          "http://localhost:8080/sellitem",
          // memberEmail: '', // 컨트롤러에서 토큰으로 정보확인 후 입력
          // writeDate: '', // 쿼리문에 now()
          {
            sellType,
            itemSub,
            itemContents,
            itemPrice: sellPrice,
            itemType: selectedItemType,
            itemDType: selectedItemDetailType,

            auctionStartPrice: auctionStartPrice,
            auctionPeriod: sendAuctionPeriod,
            auctionMaxPrice: sendAuctionMaxPrice,
            auctionRandomMethod: sendAuctionRandomMethod,
            auctionDiscountPerHour: sendAuctionDiscountPerHout,
            auctionMinPrice: sendAuctionMinPrice,
          }
        )
        .then((response) => {
          console.log(response);
          modalOpen.current.style = "display:block;";
        })
        .catch((error) => {
          console.log(error);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  console.log(auctionRandomMethod);

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
              <label>{sellType === "n" ? "판매가격" : "경매 시작가격"}</label>
              <input
                type="text"
                placeholder="가격을 작성해주세요."
                value={itemPrice}
                onChange={handlerItemPrice}
                ref={refItemPrice}
              />
              {sellType === "u" && (
                <>
                  <label>즉시구매가격</label>
                  <input
                    type="text"
                    placeholder="즉시구매가격을 입력하세요"
                    value={auctionMaxPrice}
                    onChange={handlerAuctionMaxPrice}
                    ref={refAuctionMaxPrice}
                  />
                </>
              )}
            </li>
            {sellType !== "n" && (
              <li>
                <label>경매기간(익일부터 계산)</label>
                <select
                  className={style.select_one}
                  value={selectedDay}
                  onChange={handlerSelectedDay}
                >
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
                    <option value={hour} key={index}>
                      {hour >= 10 ? hour : "0" + hour}:00
                    </option>
                  ))}
                </select>
                <br />
                {/* <input type="datetime-local" value={auctionPeriod} onChange={handlerAPeriod} ref={refAuctionPeriod} min={new Date()}></input> */}
                <div className={style.auction_d}>
                  <span>경매 시작 : </span>
                  <input type="text" value={nowText} disabled></input>
                  <br />
                  <span>경매 종료 : </span>
                  <input type="text" value={auctionPeriodText} disabled></input>
                </div>
              </li>
            )}
            {sellType === "d" ? (
              <li className={style.down_b}>
                <label>최저 가격</label>
                <input
                  type="text"
                  placeholder="내림경매의 최저가격을 설정해주세요"
                  value={auctionMinPrice}
                  onChange={handlerAuctionMinPrice}
                  ref={refAuctionMinPrice}
                />
                <label className={style.chose_p}>시간당 내릴 가격</label>
                <form ref={refAuctionRandomMethod}>
                  <input
                    type="radio"
                    name="down"
                    onChange={handlerAuctionRandomMethod}
                    value="고정내림"
                    defaultChecked={true}
                  ></input>
                  <label>고정내림</label>
                  <input
                    type="radio"
                    name="down"
                    onChange={handlerAuctionRandomMethod}
                    value="랜덤내림"
                  ></input>
                  <label>랜덤내림</label>
                </form>
                {!auctionRandomMethod ? (
                  <input
                    type="text"
                    value={auctionDiscountPerHour}
                    onChange={handlerAuctionDiscountPerHour}
                    placeholder="일정하게 내릴 가격을 입력하세요"
                    ref={refAuctionDiscountPerHour}
                  />
                ) : (
                  <p>
                    <strong>랜덤내림이란?</strong>
                    경매시작 가격에서부터 최저가격까지 시간당 랜덤으로 하락해서
                    경매에 재미를 더하는 방법
                  </p>
                )}
              </li>
            ) : (
              ""
            )}
            <li className={style.photo_b}>
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
          <ItemSuccess closeModal={closeModal} modalOpen={modalOpen} itemSub={itemSub} itemContents={itemContents} />
        </div>
      </div>
    </>
  );
}
export default Selling;
