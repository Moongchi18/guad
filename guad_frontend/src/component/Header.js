import style from "../source/Header.module.css";
import logo from "../source/img/head_logo.png";
import search from "../source/img/h_search.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className={style.header_b}>
        <header>
          <Link to="/">
            <img src={logo} alt="로고" className={style.h_logo_b} />
          </Link>
          <ul>
            <li>
              <Link to="/sell_List">판매목록</Link>
            </li>
            <li>
              <Link to="selling">상품등록</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
          <input type="text" className={style.search_b} />
          <img src={search} alt="검색창" className={style.search_icon} />
        </header>
      </div>
    </>
  );
}
export default Header;
