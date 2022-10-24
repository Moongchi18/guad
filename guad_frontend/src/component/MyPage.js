import "../source/MyPage.css";
import logo from "../source/img/mypage.png";

function Mypage() {
  return (
    <>
      <div className="All_Mbox">
        <div className="All_Mbox2">
          <h1 className="page_name">마이페이지</h1>
          <div>
            <div className="Mbox">
              <div className="logo_box">
                <img src={logo}></img>
              </div>
              <div className="mileage_box">
                <h3><strong>시흥 기린</strong>님 환영합니다!</h3>
                <h3> 현재마일리지 <strong>1,000,000</strong>원</h3>
              </div>
              <div className="Mbox_button">
                <button className="member">회원정보</button>
                <button>마일리지</button>
              </div>
            </div>
          </div>
          <div className="category">
            <h3>등록 상품 내역</h3>
          </div>
          <div>
            <div className="category_list">
                <img></img>
            </div>
          </div>
          <div className="category">
            <h3>상품 구매 내역</h3>
          </div>
          <div>
            <div className="category_list">상품이미지</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypage;
