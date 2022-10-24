import "../source/Header.css";
import logo from "../source/img/head_logo.png";
import search from "../source/img/h_search.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="header_b">
        <header>
          <Link to="/">
            <img src={logo} alt="로고" className="h_logo_b" />
          </Link>
          <ul>
            <li>판매목록</li>
            <li>상품등록</li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
          <button type="button" className="search_b">
            <img src={search} alt="검색창" />
          </button>
        </header>
      </div>
    </>
  );
}
export default Header;
