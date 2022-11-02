import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [items, setItems] = useState([]) //리스트에 나타낼 아이템
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
      setItems(data)
      setCount(data.length)
    } else if (sellItemDto.sellType !== '' && sellItemDto.itemType === '') {
      setItems(data.filter(item => item.sellType === sellItemDto.sellType))
      setCount(data.filter(item => item.sellType === sellItemDto.sellType))
    } else if (sellItemDto.sellType === '' &&
      sellItemDto.itemType !== '') {
      setItems(data.filter(item => item.itemType === sellItemDto.itemType))
      setCount(data.filter(item => item.itemType === sellItemDto.itemType))
    } else if (sellItemDto.sellType !== '' && sellItemDto.itemType !== '') {
      setItems(data.filter(item => item.itemType === sellItemDto.itemType && item.sellType === sellItemDto.sellType))
      setCount(data.filter(item => item.itemType === sellItemDto.itemType && item.sellType === sellItemDto.sellType))
    } else {
      alert("error")
    }
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage)
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [sellItemDto.sellType, sellItemDto.itemType, data, currentpage, indexOfFirstPost, indexOfLastPost, postPerPage])

  console.log(items)
  console.log(items.length)
  console.log(count)
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
        console.log(response.data.itemList)
        setData(response.data.itemList);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handlerItemType = (e) => setItemType(e.target.value);
  const handlerItemType = (e) => {
    setSellItemDto({ ...sellItemDto, itemType: e.target.value })
  };

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
          <select value={sellItemDto.itemType} onChange={handlerItemType}>
            <option value="">전체</option>
            {itemTypeList &&
              itemTypeList.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
          </select>
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
            {items.length === 0 ?
              data.map((item, index) => (
                <SellListItem item={item} key={index} />
              ))
              :
              currentPosts.map((item, index) => (
                <SellListItem item={item} key={index} />
              ))
            }
          </ul>
          <span className={style.count_p}>
            <ul>
              <SellListPaging page={currentpage} count={count} handlerSetPage={handlerSetPage} />
              <li>
                <button>1</button>
              </li>
              <li>
                <button>2</button>
              </li>
              <li>
                <button>3</button>
              </li>
              <li>
                <button>4</button>
              </li>
              <li>
                <button>5</button>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </>
  );
}
export default Sell_List;
