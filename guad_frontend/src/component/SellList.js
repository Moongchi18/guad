import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/SellList.module.css";
import SellListItem from "./SellListItem";
import SellListPaging from "./SellListPaging";

function Sell_List() {
  const [data, setData] = useState([]); // 상품 전체 정보
  const [data2, setData2] = useState([]); // 카테고리 전체정보
  const [itemTypeList, setItemTypeList] = useState([]); // 대분류
  const [itemType, setItemType] = useState("");
  const [itemDType, setItemDType] = useState([]); // 소분류
  const [sellItemDto, setSellItemDto] = useState({
    sellType: "",
    itemType: "",
  });
  const [items, setItems] = useState([]); //리스트에 나타낼 아이템
  const [count, setCount] = useState(0); //아이템 총 개수
  const [isChange, setIsChange] = useState(false);

  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(12); //페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);

  const checkSellType = (e) => {
    const gory = e.target.name;
    if (gory === "all") {
      setSellItemDto({ ...sellItemDto, sellType: "" });
      setIsChange(!isChange);
      setItems(data);
      setCount(data.length);
    } else if (gory === "up") {
      setSellItemDto({ ...sellItemDto, sellType: "u" });
      setIsChange(!isChange);
    } else if (gory === "down") {
      setSellItemDto({ ...sellItemDto, sellType: "d" });
      setIsChange(!isChange);
    } else if (gory === "normal") {
      setSellItemDto({ ...sellItemDto, sellType: "n" });
      setIsChange(!isChange);
    }
  };
  const [cateOn, setCateOn] = useState(false);
  const c_m = useRef();
  const c_o = useRef();

  const OnOption = (type) => {
    c_o.current.style = "display:inline-block;";
    setItemType(type);
    setSellItemDto({ ...sellItemDto, itemType: type });
    const newItemDT = [];
    data2.forEach((element, index) => {
      if (element.itemType === type && element.itemDType !== "") {
        newItemDT.push(element.itemDType);
      }
    });
    setItemDType(newItemDT);
    setIsChange(!isChange);
  };

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
    setSellItemDto({ ...sellItemDto, itemType: "" });
    setIsChange(!isChange);
  };
  useEffect(() => {
    console.log("itemType :" + itemType);
    console.log("itemDType :" + itemDType);
    console.log(
      "sellItemDto : " + sellItemDto.sellType + " / " + sellItemDto.itemType
    );
    if (sellItemDto.sellType === "" && sellItemDto.itemType === "") {
      setItems(data);
      console.log("sellType :" + sellItemDto.sellType);
      console.log("itemType :" + sellItemDto.itemType);
      console.log(items);
      setCount(data.length);
    } else if (sellItemDto.sellType !== "" && sellItemDto.itemType === "") {
      setItems(data.filter((item) => item.sellType === sellItemDto.sellType));
      setCount(data.filter((item) => item.sellType === sellItemDto.sellType));
      console.log("sellType :" + sellItemDto.sellType);
      console.log("itemType :" + sellItemDto.itemType);
      console.log(items);
    } else if (sellItemDto.itemType !== "" && sellItemDto.sellType === "") {
      setItems(data.filter((item) => item.itemType === sellItemDto.itemType));
      setCount(data.filter((item) => item.itemType === sellItemDto.itemType));
      console.log("sellType :" + sellItemDto.sellType);
      console.log("itemType :" + sellItemDto.itemType);
      console.log(items);
    } else if (sellItemDto.sellType !== "" && sellItemDto.itemType !== "") {
      setItems(
        data.filter(
          (item) =>
            item.itemType === sellItemDto.itemType &&
            item.sellType === sellItemDto.sellType
        )
      );
      setCount(
        data.filter(
          (item) =>
            item.itemType === sellItemDto.itemType &&
            item.sellType === sellItemDto.sellType
        )
      );
      console.log("sellType :" + sellItemDto.sellType);
      console.log("itemType" + sellItemDto.itemType);
      console.log(items);
    } else {
      alert("error");
    }
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));

    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/category/distinct`
      )
      .then((response) => {
        const list = [];
        response.data.map((d) => list.push(d.itemType));
        setItemTypeList(list);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/category`)
      .then((response) => {
        const temp1 = [];
        response.data.forEach((element) => temp1.push(element.itemType));
        const temp2 = temp1.filter(
          (element, index) => temp1.indexOf(element) === index
        );
        setData2(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sellitem`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, [
    // sellItemDto,
    isChange,
    // sellItemDto.sellType,
    // sellItemDto.itemType,
    // itemTypeList,
    // itemDType,
    // data,
    // currentpage,
    // indexOfFirstPost,
    // indexOfLastPost,
    // postPerPage,
  ]);

  const handlerSetPage = (e) => {
    setCurrentpage(e);
  };

  return (
    <>
      <div className={style.sell_all}>
        <div className={style.sell_top}>
          <h2>
            전체상품 <span></span>개
          </h2>
          <p onClick={OnCategory} className={style.cate_btn}>
            카테고리 보기
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
                    <li key={index} value={type} onClick={() => OnOption(type)}>
                      <a>{type}</a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className={style.cate_option} ref={c_o}>
              <p>{itemType}</p>
              <ul>
                {itemDType &&
                  itemDType.map((DType, index) => (
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
                  sellItemDto.sellType === ""
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
                  sellItemDto.sellType === "u"
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
                  sellItemDto.sellType === "d"
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
                  sellItemDto.sellType === "n"
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
