import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import style from "../source/SellList.module.css";

function SellListItem({ item }) {
  useEffect(() => { }, []);
  return (
    <>
      <li className={style.item_info}>
        <Link to={`/sell_item/${item.sellType}/${item.itemNum}`}>
          <div className={style.item_bb}>
            <img className={style.item_img}
              src={`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgName}`}
              alt={"img" + item.notifyNum}
            />
            <img
              src={
                item.sellType === "d"
                  ? require("../source/img/del1_b.png")
                  : item.sellType === "u"
                    ? require("../source/img/del2_b.png")
                    : require("../source/img/del4_b.png")
              }
              alt="망치"
              className={style.del_icon}
            />
          </div>
          <span className={style.tex1}>{item.itemType}</span>
          <span className={style.tex2}>{item.itemSub}</span>
          <span className={style.tex3}>
            {item.sellType === "n" ? "판매가격" : "경매시작가"}
            <strong>
              {item.sellType === "n" ? item.itemPrice.toLocaleString() : item.auctionStartPrice.toLocaleString()}
            </strong>
          </span>
        </Link>
      </li>
    </>
  );
}
export default SellListItem;
