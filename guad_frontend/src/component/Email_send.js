import style from "../source/Email_send.module.css";

function Email_send() {
  return (
    <>
      <div className={style.E_box}>
        <img
          src={require("../source/img/head_logo.png")}
          alt="로고"
          className={style.i1}
        />
        <img
          src={require("../source/img/mail.png")}
          alt="편지"
          className={style.i2}
        />
        <h2>고객님의 신고가 접수되었습니다.</h2>

        <h3>접수된 신고 내역</h3>
        <div className={style.in_box}>
          <p className={style.t1}>
            제목 : 이건 사기물품 입니다! 제재해주세요...
          </p>
          <p className={style.t2}>
            내용 : 이 물건으로 큰 피해를 입었습니다. 이에대한 제재와 보상을
            마련해주세요. 판매자를 혼내주세요!!
          </p>
        </div>
      </div>
    </>
  );
}
export default Email_send;
