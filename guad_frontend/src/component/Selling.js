import style from "../source/Selling.module.css";

function Selling() {
  return (
    <>
      <div className={style.all_box}>
        <h2>내 상품 등록하기</h2>
        <div className={style.in_box}>
          <ul>
            <li>
              <label>거래종류</label>
              <button type="button">오름 경매</button>
              <button type="button" className={style.mid}>내림 경매</button>
              <button type="button">일반 판매</button>
            </li>
            <li>
              <label>카테고리</label>
              <select className={style.select_one}>
                <option value="대분류">대분류</option>
              </select>
              <select>
                <option value="소분류">소분류</option>
              </select>
            </li>
            <li>
              <label>판매글 제목</label>
              <input type="text" placeholder="판매글 제목을 작성해주세요." />
            </li>
            <li>
              <label>판매글 작성</label>
              <textarea placeholder="판매글을 작성해주세요."></textarea>
            </li>
            <li>
              <label>경매 시작가 / 판매 가격</label>
              <input type="text" placeholder="가격을 작성해주세요." />
            </li>
            <li>
              <label>경매기간 / 판매기간</label>
              <select>
                <option></option>
              </select>
            </li>
            <li>
              <label>사진등록</label>
              <p>필수로 1장 이상의 사진을 등록해야 합니다.</p>
              <div>
                <img src={require("../source/img/pic.png")} alt="사진1" />
                <img src={require("../source/img/pic.png")} alt="사진2" className={style.mid_imgg}/>
                <img src={require("../source/img/pic.png")} alt="사진3" />
              </div>
            </li>
          </ul>
          <button type="button" className={style.subBtn}>등록완료</button>
        </div>
      </div>
    </>
  );
}
export default Selling;
