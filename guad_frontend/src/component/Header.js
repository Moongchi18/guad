import "../source/Header.css";
function Header() {
  return (
    <>
    <header>
        <img src="/source/img/head_logo.png" alt="로고" />
        <button type="button"><img src="" alt="검색창" /></button>
        <ul>
            <li>판매목록</li>
            <li>상품등록</li>
            <li>로그인</li>
        </ul>
    </header>
    </>
  );
}
export default Header;
