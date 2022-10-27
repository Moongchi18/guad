import style from "../source/Moodal4.module.css";
import logo from "../source/img/big_warn.png";

function MoodalNotify() {
  return (
    <>
      <div id="my-modal" className={style.modal}>
        <div className={style.modalcontent}>
          <span class={style.close} id="close">
            &times;
          </span>
          <div className={style.modalheader}>
            <img src={require("../source/img/big_warn.png")} alt="2" />
            <h2 className={style.title}>접수된 신고 내용</h2>
            <h3 className={style.member}>신고자: 시흥기린</h3>
          </div>
          <div className={style.modalbody}>
            <div className={style.seller}>
              <h3 className={style.fix}>판매자</h3>
              <h3>asd@naver.com</h3>
            </div>
            <div className={style.category}>
              <h3 className={style.fix}>카테고리</h3>
              <h3>상품 상태 불량</h3>
            </div>
          </div>
          <div className={style.message}>
          <p>
              이곳은 신고 내용을 작성하는곳입니다.
              여기에는 온갖 별의별 내용의 신고가 작성될거 같은데 이걸 쓰는 사람이 과연 있을까 싶기도 하고
              뭔지 모르겠네요 하..
            </p>
          </div>
          <div className={style.modalfooter}>
            <button type="button" className={style.redBtn}>
              신고하기
            </button>
            <button type="text" id="outMan">
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoodalNotify;
