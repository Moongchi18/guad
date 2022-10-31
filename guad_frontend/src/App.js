import "./App.css";
import FileUploadForm from "./FileUploadForm";
import { Route } from "react-router-dom";
import GoogleLoginForm from "./GoogleLoginForm";
import Header from "./component/Header";
import Login from "./component/Login";
import AuctionTest from "./auction/AuctionTest";
import Auction from "./auction/Auction";
import Footer from "./component/Footer";
import Main from "./component/Main";
import Mypage from "./component/Mypage/Mypage";
import MypageInfo from "./component/Mypage/MypageInfo";
import Mileage from "./component/Moodal/Mileage";
import Manager from "./component/Manager/Manager";
import ManagerNotify from "./component/Manager/ManagerNotify";
import ManagerMember from "./component/Manager/ManagerMember";

import Join from "./component/Join";
import JoinG from "./component/JoinG";
import SellList from "./component/SellList";
import axios from "axios";
import SellItem from "./component/SellItem";
import ChatRoom from "./auction/ChatRoom";

import Selling from "./component/Selling";
import ChatTest from "./auction/ChatTest";

import Sell_Up from "./component/Sell_Up";
import Sell_Down from "./component/Sell_Down";
import Sell_End from "./component/Sell_End";
import Sell_After from "./component/Sell_After";

import { useState, useRef } from "react";
import MypageCheck from "./component/Mypage/MypageCheck";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  function handlerIsLogin(value) {
    setIsLogin(value);
  }

  axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return (
    <>
      <Header />
      <Route path="/g_login" component={GoogleLoginForm} exact={true} />
      <Route
        path="/login"
        component={Login}
        exact={true}
        handlerIsLogin={handlerIsLogin}
      />
      <Route path="/upload" component={FileUploadForm} exact={true} />
      <Route
        path="/header"
        component={Header}
        exact={true}
        handlerIsLogin={handlerIsLogin}
      />
      <Route
        path="/auction/test/:itemNum"
        component={AuctionTest}
        exact={true}
      />
      <Route path="/chat/:nickname" component={ChatTest} exact={true} />
      <Route path="/chatroom" component={ChatRoom} exact={true} />
      <Route path="/auction" component={Auction} exact={true} />
      <Route path="/footer" component={Footer} exact={true} />
      <Route path="/" component={Main} exact={true} />

      <Route path="/mypage" component={Mypage} exact={true} />
      <Route path="/mypage/info" component={MypageInfo} exact={true} />
      <Route path="/mypage/check" component={MypageCheck} exact={true} />
      <Route path="/mileage" component={Mileage} exact={true} />
      <Route path="/manager" component={Manager} exact={true} />
      <Route path="/manager/member" component={ManagerMember} exact={true} />
      <Route path="/manager/notify" component={ManagerNotify} exact={true} />

      <Route path="/join" component={Join} exact={true} />
      <Route path="/join_g" component={JoinG} exact={true} />
      <Route path="/sell_list" component={SellList} exact={true} />
      <Route path="/sell_item" component={SellItem} exact={true} />
      <Route path="/selling" component={Selling} exact={true} />
      <Route path="/sell_up" component={Sell_Up} exact={true} />
      <Route path="/sell_down" component={Sell_Down} exact={true} />
      <Route path="/sell_end" component={Sell_End} exact={true} />
      <Route path="/sell_after" component={Sell_After} exact={true} />

      <Footer />
    </>
  );
}

export default App;
