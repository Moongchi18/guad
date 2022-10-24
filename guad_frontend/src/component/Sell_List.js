import "../source/Sell_List.css";

function Sell_List() {
  return (
    <>
      <div class="sell_all">
        <div className="sell_top">
          <h2>
            전체상품<span>53</span>개
          </h2>
          <select>
            <option value="카테고리 선택">카테고리 선택</option>
          </select>
          <ul>
            <li>
              <button>전 품목</button>
            </li>
            <li>
              <button>오름경매</button>
            </li>
            <li>
              <button>내림경매</button>
            </li>
            <li>
              <button>일반판매</button>
            </li>
          </ul>
        </div>
        <div className="sell_bot">
          <ul>
            <li className="item_info">
              <img src={require("../source/img/item01.png")} alt="제품1" />
              <span className="tex1">의류/가방</span>
              <span className="tex2">디올 오피디아 스몰 패턴 도트백 </span>
              <span className="tex3">
                경매시작가<strong>450,000</strong>
              </span>
            </li>
          </ul>
          <span className="count_p">
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
