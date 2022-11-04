import React, { useEffect, useRef } from "react";
import style from "../source/Login.module.css";
import axios from "axios";
import { useState } from "react";
import logo from "../source/img/login_logo.png";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  // handlerIsLogin(true);
  // console.log(isLogin)

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", { email: email, pass: password })
      .then((response) => {
        sessionStorage.setItem("token", response.data);
        axios.get("http://localhost:8080/member", { header: { Authorization: response.data } })
          .then(response => {
            console.log(response.data.nickname)
            sessionStorage.setItem("nickname", response.data.nickname);
          })
        props.handlerIsLogin();
        alert("로그인 되었습니다.");
        props.history.push("/");
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
        alert("로그인에 실패했습니다.");
        sessionStorage.clear();
      });
  };

  useEffect(() => {
    const hoverBox = document.getElementById("gg");
    const hoverItem = document.getElementById("ggg");
    hoverBox.addEventListener("mouseover", function () {
      hoverItem.setAttribute("src", require("../source/img/gg1.png"));
    });
    hoverBox.addEventListener("mouseout", function () {
      hoverItem.setAttribute("src", require("../source/img/gg2.png"));
    });
    console.log(props.isLogin);
    console.log(props);
    console.log("호출");
  }, []);

  return (
    <>
      <div className={style.All_box}>
        <div className={style.login_box}>
          <img src={logo} className={style.Logo} alt="로고" />
          <span className={style.logintext}>가입한 계정으로 로그인</span>
          <input
            className={style.in_box}
            placeholder="아이디"
            value={email}
            onChange={changeEmail}
          />
          <input
            className={style.in_box}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={changePassword}
          />
          <span className={style.check_b}>아이디저장</span>
          <button
            className={[style.login, style.btn_bb].join(" ")}
            onClick={handlerSubmit}
            type="button"
          >
            로그인
          </button>
          <Link to="/join_g">
            <button className={[style.g_join, style.btn_bb].join(" ")} id="gg">
              <img
                src={require("../source/img/gg2.png")}
                alt="구글 로그인"
                id="ggg"
              />
            </button>
          </Link>
          <Link to="/join">
            <button
              className={[style.join, style.btn_bb].join(" ")}
              type="button"
            >
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Login;
