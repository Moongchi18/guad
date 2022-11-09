import style from "../../source/Mypage_SellList.module.css";

function My_Buy() {
  return (
    <>
      <div className={style.sell}>
        <div className={style.sell_list}>
          <img src={require("../../source/img/big_item.png")} alt="물품" />
          <h3>구매물품</h3>
        </div>
      </div>
    </>
  );
}
export default My_Buy;
