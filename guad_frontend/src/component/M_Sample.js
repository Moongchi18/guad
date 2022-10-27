import style from "../source/M_Sample.module.css";

function M_Sample() {
  window.onload = function () {
    // Get DOM Elements
    const modal = document.getElementById("my-modal");
    const modalBtn = document.getElementById("modal-btn");
    const closeBtn = document.getElementById("close");

    // Events
    modalBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", outsideClick);

    // Open
    function openModal() {
      modal.style.display = "block";
    }

    // Close
    function closeModal() {
      modal.style.display = "none";
    }

    // Close If Outside Click
    function outsideClick(e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    }
  };

  return (
    <>
      <button id="modal-btn">Click Here</button>

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
export default M_Sample;
