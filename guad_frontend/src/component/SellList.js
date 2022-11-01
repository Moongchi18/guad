import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../source/SellList.module.css";

function Sell_List() {
  const [data, setData] = useState([]);
  const [presentData, setPresentData] = useState([{ sellType: '', itemType: '' }]);
  const [itemTypeList, setItemTypeList] = useState([]);
  const [sellItemDto, setSellItemDto] = useState({
    itemNum: "",
    sellType: "",
    memberEmail: "",
    itemSub: "",
    itemContents: "",
    itemPrice: "",
    itemType: "",
    itemDType: "",
    writeDate: "",
    hitCnt: "",
    auctionStartPrice: "",
    auctionMaxPrice: "",
    auctionMinPrice: "",
    auctionPeriod: "",
    auctionRandomMethod: "",
    auctionDiscountPerHour: "",
    soldYn: "",
    deleteYn: "",
  });

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
    setPresentData(data)
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
        setData(response.data.itemList);
        setPresentData(response.data.itemList);
      })
      .catch((error) => console.log(error));
  }, []);

  // const handlerItemType = (e) => setItemType(e.target.value);
  const handlerItemType = (e) => {
    setSellItemDto({ ...sellItemDto, itemType: e.target.value })
    setPresentData(data)
  };

  console.log(data);
  return (
    <>
      <div className={style.sell_all}>
        <div className={style.sell_top}>
          <h2>
            전체상품 <span>{sellItemDto.length}</span>개
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
              presentData.map((item, index) => (
                <li className={style.item_info} key={index}>
                  <Link to={`/sell_item/${item.itemNum}`}>
                    <div className={style.item_bb}>
                      <img
                        src={require("../source/img/item01.png")}
                        alt="제품1"
                      />
                      <img
                        src={item.sellType === 'd' ? require("../source/img/del1_b.png") : (item.sellType === 'u' ? require("../source/img/del2_b.png") : require("../source/img/white.png"))}
                        alt="망치"
                        className={style.del_icon}
                      />
                    </div>
                    <span className={style.tex1}>{item.itemType}</span>
                    <span className={style.tex2}>{item.itemSub}</span>
                    <span className={style.tex3}>
                      {item.sellType === "n" ? "판매가격" : "경매시작가"}
                      <strong>
                        {item.sellType === "n"
                          ? item.itemPrice
                          : item.auctionStartPrice}
                      </strong>
                    </span>
                  </Link>
                </li>
              ))}
            {sellItemDto.sellType !== '' &&
              sellItemDto.itemType === "" &&
              presentData.filter(item => item.sellType === sellItemDto.sellType)
                .map((item, index) => (
                  <li className={style.item_info} key={index}>
                    <Link to={`/sell_item/${item.itemNum}`}>
                      <div className={style.item_bb}>
                        <img
                          src={require("../source/img/item01.png")}
                          alt="제품1"
                        />
                        <img
                          src={item.sellType === 'd' ? require("../source/img/del1_b.png") : (item.sellType === 'u' ? require("../source/img/del2_b.png") : require("../source/img/white.png"))}
                          alt="망치"
                          className={style.del_icon}
                        />
                      </div>
                      <span className={style.tex1}>{item.itemType}</span>
                      <span className={style.tex2}>{item.itemSub}</span>
                      <span className={style.tex3}>
                        {item.sellType === "n" ? "판매가격" : "경매시작가"}
                        <strong>
                          {item.sellType === "n"
                            ? item.itemPrice
                            : item.auctionStartPrice}
                        </strong>
                      </span>
                    </Link>
                  </li>
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
