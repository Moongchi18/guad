function fileUploadForm() {

  return (
    <>
    <h3>파일 업로드</h3>
    <form id="fileUploadForm" method="post" action="/upload/fileUpload" enctype="multipart/form-data">
      파일 : <input type="file" id="uploadFile" name="uploadFile"/>
    </form>
    </>
  );
}

export default fileUploadForm;
