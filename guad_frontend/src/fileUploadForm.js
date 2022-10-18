
import axios from "axios";

function fileUploadForm({history}) {


  const handlerClickSubmit = () => {
    axios.post(`http://localhost:8080/upload/fileUploadMultiple`, {
      
    })
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        alert("파일업로드가 완료되었습니다.");
        history.push("/login");
      } else {
        alert("파일업로드에 실패했습니다.");
        return;
      }
    })
    .catch((error) => console.log(error));
  }


  return (
    <>
      <h3>파일 업로드 (여러 개 파일 업로드)</h3>
      <form
        id="fileUploadFormMulti"
        method="post"
        action="/upload/fileUploadMultiple"
        enctype="multipart/form-data"
      >
        파일 :{" "}
        <input
          type="file"
          id="uploadFileMulti"
          name="uploadFileMulti"
          multiple="multiple"
        />
        <button type="button" onClick={handlerClickSubmit}>
          파일업로드
        </button>
      </form>
    </>
  );
}

export default fileUploadForm;
