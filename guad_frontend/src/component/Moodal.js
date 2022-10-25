import React from "react";
import "../source/Moodal.css";

function Moodal() {
  const modal = document.querySelector("#my-modal");
  const modalBtn = document.querySelector("#modal-btn");
  const closeBtn = document.querySelector(".close");

  modalBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", outsideClick);

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function outsideClick(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  }

  return (
    <>
      <button id="modal-btn" className="button">
        Click Here
      </button>

      <div id="my-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close">&times;</span>
            <h2>Modal Header</h2>
          </div>
          <div className="modal-body">
            <p>This is my modal</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              repellendus nisi, sunt consectetur ipsa velit repudiandae aperiam
              modi quisquam nihil nam asperiores doloremque mollitia dolor
              deleniti quibusdam nemo commodi ab.
            </p>
          </div>
          <div className="modal-footer">
            <h3>Modal Footer</h3>
          </div>
        </div>
      </div>
    </>
  );
}
export default Moodal;
