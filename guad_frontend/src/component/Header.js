import style from "../source/Header.module.css";
import logo from "../source/img/head_logo.png";
import search from "../source/img/h_search.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({handlerIsLogin}) {
  const [mypage, SetMypage] = useState(false);
  
  useEffect(() => {
    if(sessionStorage.length != 0) {
      SetMypage(true);
    }else if(sessionStorage.length == 0) {
      SetMypage(false);
    }
  }, []);

  function handleSignOut(e) {
    alert("로그아웃 되었습니다.");
    sessionStorage.clear();
    SetMypage(false);
    handlerIsLogin(false);
  }


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

            {sessionStorage.length == 0 && (
              <li>
                <Link id="login" to="/login">
                  로그인
                </Link>
              </li>
            )}

            {sessionStorage.length != 0 && (
              <li onClick={(e) => handleSignOut(e)}>
                <Link id="logout" to="/">
                  로그아웃
                </Link>
              </li>
            )}

            {mypage == true && (
            <li>
              <Link id="mypage" to="/mypage">
                마이페이지
              </Link>
            </li>
            )}
          </ul>
          <input type="text" className={style.search_b} />
          <img src={search} alt="검색창" className={style.search_icon} />
        </header>
      </div>
    </>
  );
}
export default Header;
