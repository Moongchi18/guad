import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/SellList.module.css";
import SellListItem from "./SellListItem";
import SellListPaging from "./SellListPaging";

function Sell_List() {
  const [data, setData] = useState([]); // 상품 전체 정보
  const [category, setCategory] = useState([]); // 카테고리 전체정보
  const [itemTypeList, setItemTypeList] = useState([]); // 대분류
  // const [itemType, setItemType] = useState(""); // 선택된 대분류
  const [itemDTypeList, setItemDTypeList] = useState([]); // 소분류
  const [selectedOptions, setSelectedOptions] = useState({
    sellType: "",
    itemType: "",
    itemDType: '',
    search: '',
  });
  const [items, setItems] = useState([]); //리스트에 나타낼 아이템

  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(12); //페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  
  const [cateOn, setCateOn] = useState(false);
  const c_m = useRef();
  const c_o = useRef();

  const checkSellType = (e) => {
    const gory = e.target.name;
    if (gory === "all") {
      setSelectedOptions({ ...selectedOptions, sellType: "" });
      setItems(data);
    } else if (gory === "up") {
      setSelectedOptions({ ...selectedOptions, sellType: "u" });
    } else if (gory === "down") {
      setSelectedOptions({ ...selectedOptions, sellType: "d" });
    } else if (gory === "normal") {
      setSelectedOptions({ ...selectedOptions, sellType: "n" });
    }
  };
  
  const OnItemType = (type) => {
    c_o.current.style = "display:inline-block;";
    // setItemType(type);
    setSelectedOptions({ ...selectedOptions, itemType: type });
    const newItemDT = [];
    category.forEach((element, index) => {
      if (element.itemType === type && element.itemDType !== "") {
        newItemDT.push(element.itemDType);
      }
    });
    setItemDTypeList(newItemDT);
  };

  useEffect(() => {
    // console.log("itemType :" + itemType);
    console.log("itemDType :" + itemDTypeList);
    console.log(
      "selectedOptions : " + selectedOptions.sellType + " / " + selectedOptions.itemType
    );
    if (selectedOptions.sellType === "" && selectedOptions.itemType === "") {
      setItems(data);
      console.log("sellType :" + selectedOptions.sellType);
      console.log("itemType :" + selectedOptions.itemType);
      console.log(items);
    } else if (selectedOptions.sellType !== "" && selectedOptions.itemType === "") {
      setItems(data.filter((item) => item.sellType === selectedOptions.sellType));
      console.log("sellType :" + selectedOptions.sellType);
      console.log("itemType :" + selectedOptions.itemType);
      console.log(items);
    } else if (selectedOptions.itemType !== "" && selectedOptions.sellType === "") {
      setItems(data.filter((item) => item.itemType === selectedOptions.itemType));
      console.log("sellType :" + selectedOptions.sellType);
      console.log("itemType :" + selectedOptions.itemType);
      console.log(items);
    } else if (selectedOptions.sellType !== "" && selectedOptions.itemType !== "") {
      setItems(
        data.filter(
          (item) =>
            item.itemType === selectedOptions.itemType &&
            item.sellType === selectedOptions.sellType
        )
      );
      console.log("sellType :" + selectedOptions.sellType);
      console.log("itemType" + selectedOptions.itemType);
      console.log(items);
    } else {
      alert("error");
    }
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));


  }, [
    selectedOptions,
    // selectedOptions.sellType,
    // selectedOptions.itemType,
    // itemTypeList,
    // itemDType,
    // data,
    // currentpage,
    // indexOfFirstPost,
    // indexOfLastPost,
    // postPerPage,
  ]);

  useEffect(() => {
    axios
    .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/category`)
    .then((response) => {
      const temp1 = [];
      console.log(response.data)
      response.data.forEach((element) => temp1.push(element.itemType));
      const temp2 = temp1.filter(
        (element, index) => temp1.indexOf(element) === index
      );
      console.log(temp2)
      setItemTypeList(temp2)
      setCategory(response.data);
    })
    .catch((error) => console.log(error));

  axios
    .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sellitem`)
    .then((response) => {
      console.log(response.data)
      setData(response.data);
    })
    .catch((error) => console.log(error));

  }, [])

  // const handlerSetPage = (e) => {
  //   setCurrentpage(e);
  // };

  const OnCategory = (e) => {
    if (cateOn === false) {
      setCateOn(true);
      c_m.current.style = "display:inline-block;";
    } else {
      setCateOn(false);
      c_m.current.style = "display:none;";
      c_o.current.style = "display:none;";
    }
  };

  const OffCategory = () => {
    setCateOn(false);
    c_m.current.style = "display:none;";
    c_o.current.style = "display:none;";
  };

  const ResetType = () => {
    setSelectedOptions({ ...selectedOptions, itemType: "" });
    // setItemType("");
    c_o.current.style = "display:none;";
  };

  return (
    <>
      <div className={style.sell_all}>
        <div className={style.sell_top}>
          <h2>
            전체상품
            {items.length == 0 && <strong>0</strong>}
            {items.length != 0 && <strong>{items.length}</strong>}개
          </h2>
          <p onClick={OnCategory} className={style.cate_btn}>
            {selectedOptions.itemType == "" && <>카테고리 보기</>}
            {selectedOptions.itemType != "" && <>{selectedOptions.itemType}</>}
          </p>
          <div className={style.cate_box}>
            <div className={style.cate_main} ref={c_m}>
              <span className={style.close} onClick={OffCategory}>
                &times;
              </span>
              <p onClick={ResetType} className={style.reset}>
                전체 카테고리
              </p>
              <ul>
                {itemTypeList &&
                  itemTypeList.map((type, index) => (
                    <li key={index} value={type} onClick={() => OnItemType(type)}>
                      <a>{type}</a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className={style.cate_option} ref={c_o}>
              <p>{selectedOptions.itemType}</p>
              <ul>
                {itemDTypeList &&
                  itemDTypeList.map((DType, index) => (
                    <li value={DType} key={index}>
                      <a>{DType}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <ul>
            <li>
              <button
                type="button"
                name="all"
                onClick={checkSellType}
                className={
                  selectedOptions.sellType === ""
                    ? `${style.cate_true}`
                    : `${style.cate_false}`
                }
              >
                전 품목
              </button>
            </li>
            <li>
              <button
                type="button"
                name="up"
                onClick={checkSellType}
                className={
                  selectedOptions.sellType === "u"
                    ? `${style.cate_true}`
                    : `${style.cate_false}`
                }
              >
                오름경매
              </button>
            </li>
            <li>
              <button
                type="button"
                name="down"
                onClick={checkSellType}
                className={
                  selectedOptions.sellType === "d"
                    ? `${style.cate_true}`
                    : `${style.cate_false}`
                }
              >
                내림경매
              </button>
            </li>
            <li>
              <button
                type="button"
                name="normal"
                onClick={checkSellType}
                className={
                  selectedOptions.sellType === "n"
                    ? `${style.cate_true}`
                    : `${style.cate_false}`
                }
              >
                일반판매
              </button>
            </li>
          </ul>
        </div>
        <div className={style.sell_bot}>
          <ul>
            {data === 0 && <span>게시물이 없습니다.</span>}
            {items.length !== 0 &&
              currentPosts.map((item, index) => (
                <SellListItem item={item} key={index} />
              ))}
          </ul>
          <span className={style.count_p}>
            {/* <ul>
              <SellListPaging
                page={currentpage}
                count={count}
                handlerSetPage={handlerSetPage}
              />
            </ul> */}
          </span>
        </div>
      </div>
    </>
  );
}
export default Sell_List;
