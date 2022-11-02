import { Link } from "react-router-dom";
import style from "../source/SellList.module.css";

function SellListItem({ item, index, handlerCount }) {
  handlerCount(index);
  return (
    <>
      <li className={style.item_info}>
        <Link to={`/sell_item/${item.itemNum}`}>
          <div className={style.item_bb}>
            <img src={require("../source/img/item01.png")} alt="제품1" />
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
              {item.sellType === "n" ? item.itemPrice : item.auctionStartPrice}
            </strong>
          </span>
        </Link>
      </li>
    </>
  );
}

export default SellListItem;
