import "./App.css";
import FileUploadForm from "./FileUploadForm";
import { Route } from "react-router-dom";
import GoogleLoginForm from "./GoogleLoginForm";
import Header from "./component/Header";
import Login from "./component/Login";
import AuctionTest from "./auction/AuctionTest";
import Auction from "./component/Auction";
import Footer from "./component/Footer";
import Main from "./component/Main";
import Join from "./component/Join";
import Join_g from "./component/Join_g";
import MyPage from "./component/MyPage";
import Sell_List from "./component/Sell_List";
import axios from "axios";

function App() {
  axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem("token");
    console.log(token);
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;

  });
  return (
    <>
      <Header />
      <Route path="/g_login" component={GoogleLoginForm} exact={true} />
      <Route path="/login" component={Login} exact={true} />
      <Route path="/upload" component={FileUploadForm} exact={true} />
      <Route path="/header" component={Header} exact={true} />
      <Route
        path="/auction/test/:itemNum"
        component={AuctionTest}
        exact={true}
      />
      <Route path="/auction" component={Auction} exact={true} />
      <Route path="/mypage" component={MyPage} exact={true} />
      <Route path="/footer" component={Footer} exact={true} />
      <Route path="/" component={Main} exact={true} />
      <Route path="/join" component={Join} exact={true} />
      <Route path="/join_g" component={Join_g} exact={true} />
      <Route path="/sell_List" component={Sell_List} exact={true} />
      <Footer />
    </>
  );
}

export default App;
