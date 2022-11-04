import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/SellList.module.css";
import SellListItem from "./SellListItem";
import SellListPaging from "./SellListPaging";

function Sell_List() {
  const [data, setData] = useState([]);
  const [itemTypeList, setItemTypeList] = useState([]);
  const [sellItemDto, setSellItemDto] = useState({
    sellType: "",
    itemType: "",
  });
  const [items, setItems] = useState([]); //리스트에 나타낼 아이템
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(12); //페이지당 아이템 개수

  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);

  const checkSellType = (e) => {
    const gory = e.target.name;
    if (gory === "all") {
      setSellItemDto({ ...sellItemDto, sellType: "" });
      setItems(data);
      setCount(data.length);
    } else if (gory === "up") {
      setSellItemDto({ ...sellItemDto, sellType: "u" });
    } else if (gory === "down") {
      setSellItemDto({ ...sellItemDto, sellType: "d" });
    } else if (gory === "normal") {
      setSellItemDto({ ...sellItemDto, sellType: "n" });
    }
  };

  useEffect(() => {
    if (sellItemDto.sellType === "" && sellItemDto.itemType === "") {
      setItems(data);
      setCount(data.length);
    } else if (sellItemDto.sellType !== "" && sellItemDto.itemType === "") {
      setItems(data.filter((item) => item.sellType === sellItemDto.sellType));
      setCount(data.filter((item) => item.sellType === sellItemDto.sellType));
    } else if (sellItemDto.sellType === "" && sellItemDto.itemType !== "") {
      setItems(data.filter((item) => item.itemType === sellItemDto.itemType));
      setCount(data.filter((item) => item.itemType === sellItemDto.itemType));
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
    } else {
      alert("error");
    }
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [
    sellItemDto.sellType,
    sellItemDto.itemType,
    data,
    currentpage,
    indexOfFirstPost,
    indexOfLastPost,
    postPerPage,
  ]);

  // console.log(items)
  // console.log(items.length)
  // console.log(count)
  // console.log(sellItemDto.sellType==='')
  // console.log(sellItemDto.itemType==='')

  const [cateOn, setCateOn] = useState(false);
  const c_m = useRef();
  const c_o = useRef();

  const OnOption = () => {
    c_o.current.style = "display:inline-block;";
  };

  const handlerItemType = (e) => {};

  const OnCategory = (e) => {
    if (cateOn === false) {
      setCateOn(true);
      setSellItemDto({ ...sellItemDto, itemType: e.target.value });
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
  useEffect(() => {
    axios
      .get("http://localhost:8080/category/distinct")
      .then((response) => {
        const list = [];
        response.data.map((d) => list.push(d.itemType));
        setItemTypeList(list);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/sellitem")
      .then((response) => {
        console.log(response.data.itemList);
        setData(response.data.itemList);
      })
      .catch((error) => console.log(error));

    console.log(sellItemDto);
  }, [sellItemDto]);

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
          {/* 과거의 유물 전*/}
          <div value={sellItemDto.itemType} onChange={handlerItemType}></div>
          {/* 과거의 유물 후 */}
          <p onClick={OnCategory} className={style.cate_btn}>
            카테고리 보기
          </p>
          <div className={style.cate_box}>
            <div className={style.cate_main} ref={c_m}>
              <span className={style.close} onClick={OffCategory}>
                &times;
              </span>
              <p>전체 카테고리</p>
              <ul>
                {itemTypeList &&
                  itemTypeList.map((type, index) => (
                    <li key={index} value={type} onClick={OnOption}>
                      {type}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={style.cate_option} ref={c_o}>
              <p>여성의류</p>
              <ul>
                <li>패딩</li>
                <li>코트</li>
                <li>원피스</li>
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
            <ul>
              <SellListPaging
                page={currentpage}
                count={count}
                handlerSetPage={handlerSetPage}
              />
            </ul>
          </span>
        </div>
      </div>
    </>
  );
}
export default Sell_List;
