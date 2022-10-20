import "./App.css";
import FileUploadForm from "./FileUploadForm";
import Auction from "./component/Auction";
import { Route } from "react-router-dom";
import GoogleLoginForm from "./GoogleLoginForm";
import Header from "./component/Header";
import Login from "./component/Login";
import Footer from "./component/Footer";

function App() {
  console.log("test33333");
  return (
    <>
      <Header />
      <Route path="/g_login" component={GoogleLoginForm} exact={true} />
      <Route path="/login" component={Login} exact={true} />
      <Route path="/upload" component={FileUploadForm} exact={true} />
      <Route path="/header" component={Header} exact={true} />
      <Route path="/footer" component={Footer} exact={true} />
      <Footer />
    </>
  );
}

export default App;
