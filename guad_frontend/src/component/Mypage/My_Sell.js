import axios from "axios";
import { useEffect, useState } from "react";
import style from "../../source/Mypage_SellList.module.css";

function My_Sell() {

  const [sellList, setSellList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/selllistd`).then((response) => {
      setSellList(response.data);    
    });
  }, []);

  return (
    <>
      <div className={style.sell}>
      {sellList &&
          sellList.map((list) => (
        <div className={style.sell_list}>
          <img src={`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${list.itemImgName}`}
               alt={"img" + list.itemNum} />
          <h3>{list.itemSub}</h3>
        </div>
          ))}
      </div>
    </>
  );
}
export default My_Sell;
