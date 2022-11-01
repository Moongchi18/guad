import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../source/SellList.module.css";
import SellListItem from "./SellListItem";

function Sell_List() {
  const [data, setData] = useState([]);
  const [itemTypeList, setItemTypeList] = useState([]);
  const [sellItemDto, setSellItemDto] = useState({
    sellType: "",
    itemType: "",
  });
  const [count, setCount] = useState();

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
    setData(data)
    setCount(0)
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
        console.log(response)
        setData(response.data.itemList);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handlerItemType = (e) => setItemType(e.target.value);
  const handlerItemType = (e) => {
    setSellItemDto({ ...sellItemDto, itemType: e.target.value })
    setData(data)
    setCount(0)
  };

  const handlerCount = (e) => {
    if(e>=0){
      setCount(e+1)
    } else{
      setCount(0)
    }
  }

  return (
    <>
      <div className={style.sell_all}>
        <div className={style.sell_top}>
          <h2>
            전체상품 <span>{count}</span>개
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
            {sellItemDto.sellType === "" &&
              sellItemDto.itemType === "" &&
              data.map((item, index) => (
                <SellListItem item={item} key={index} index={index} handlerCount={handlerCount} />
              ))
            }
            {sellItemDto.sellType !== '' &&
              sellItemDto.itemType === '' &&
              data.filter(item => item.sellType === sellItemDto.sellType)
                .map((item, index) => (
                  <SellListItem item={item} key={index} index={index} handlerCount={handlerCount} />
                ))
            }
            {sellItemDto.sellType === '' &&
              sellItemDto.itemType !== '' &&
              data.filter(item => item.itemType === sellItemDto.itemType)
                .map((item, index) => (
                  <SellListItem item={item} key={index} index={index} handlerCount={handlerCount} />
                ))
            }
            {/*  */}
            {sellItemDto.sellType !== '' &&
              sellItemDto.itemType !== '' &&
              data.filter(item => item.itemType === sellItemDto.itemType && item.sellType === sellItemDto.sellType)
                .map((item, index) => (
                  <SellListItem item={item} key={index} index={index} handlerCount={handlerCount} />
                ))
            }
          </ul>
          <span className={style.count_p}>
            <ul>
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
