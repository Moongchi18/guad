import "../source/MyPage.css";

function MyPage() {
  return (
    <>
      <div>
        <div className="All_Mbox">
            <h1 className="page_name">
                   마이페이지
            </h1>
            <div>
                <div className="Mbox">
                    사진, 글, 버튼
                </div>
            </div>
            <div className="category">
                <h3>등록 상품 내역</h3>
            </div>
            <div>
                <div className="category_list">상품이미지</div>
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

export default MyPage;
