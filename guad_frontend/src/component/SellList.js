import { useState } from "react";
import { Link } from "react-router-dom";
import style from "../source/SellList.module.css";

function Sell_List() {
  const [cate, setCate] = useState("");

  const checkCate = (e) => {
    const gory = e.target.name;
    if (gory == "all") {
      setCate("a");
    } else if (gory == "up") {
      setCate("u");
    } else if (gory == "down") {
      setCate("d");
    } else {
      setCate("n");
    }
  };
  return (
    <>
      <div className={style.sell_all}>
        <div className={style.sell_top}>
          <h2>
            전체상품 <span>53</span>개
          </h2>
          <select>
            <option value="카테고리 선택">카테고리 선택</option>
          </select>
          <ul>
            <li>
              <button
                type="button"
                name="all"
                onClick={checkCate}
                className={
                  cate == "a" ? `${style.cate_true}` : `${style.cate_false}`
                }
              >
                전 품목
              </button>
            </li>
            <li>
              <button
                type="button"
                name="up"
                onClick={checkCate}
                className={
                  cate == "u" ? `${style.cate_true}` : `${style.cate_false}`
                }
              >
                오름경매
              </button>
            </li>
            <li>
              <button
                type="button"
                name="down"
                onClick={checkCate}
                className={
                  cate == "d" ? `${style.cate_true}` : `${style.cate_false}`
                }
              >
                내림경매
              </button>
            </li>
            <li>
              <button
                type="button"
                name="normal"
                onClick={checkCate}
                className={
                  cate == "n" ? `${style.cate_true}` : `${style.cate_false}`
                }
              >
                일반판매
              </button>
            </li>
          </ul>
        </div>
        <div className={style.sell_bot}>
          <ul>
            <li className={style.item_info}>
              <Link to="/sell_item">
                <div className={style.item_bb}>
                  <img src={require("../source/img/item01.png")} alt="제품1" />
                </div>
                <span className={style.tex1}>의류/가방</span>
                <span className={style.tex2}>
                  디올 오피디아 스몰 패턴 도트백
                </span>
                <span className={style.tex3}>
                  경매시작가<strong>450,000</strong>
                </span>
              </Link>
            </li>
            <li className={style.item_info}>
              <Link to="/sell_item">
                <div className={style.item_bb}>
                  <img src={require("../source/img/item01.png")} alt="제품1" />
                  <img
                    src={require("../source/img/del1.png")}
                    alt="내림경매"
                    className={style.del_icon}
                  />
                </div>
                <span className={style.tex1}>의류/가방</span>
                <span className={style.tex2}>
                  디올 오피디아 스몰 패턴 도트백
                </span>
                <span className={style.tex3}>
                  경매시작가<strong>450,000</strong>
                </span>
              </Link>
            </li>
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
