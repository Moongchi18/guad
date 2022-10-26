import style from "../source/M_Sample.module.css";

function MoodalNotify() {
  return (
    <>
     

      <div id="my-modal" class={style.modal}>
        <div class={style.modalcontent}>
          <div class={style.modalheader}>
            <span class={style.close} id="close">
              &times;
            </span>
            <h2>Modal Header</h2>
          </div>
          <div class={style.modalbody}>
            <p>This is my modal</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              repellendus nisi, sunt consectetur ipsa velit repudiandae aperiam
              modi quisquam nihil nam asperiores doloremque mollitia dolor
              deleniti quibusdam nemo commodi ab.
            </p>
          </div>
          <div class={style.modalfooter}>
            <h3>Modal Footer</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoodalNotify;
