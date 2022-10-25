import React from "react";
import style from "../source/Login.module.css";
import axios from "axios";
import { useState } from "react";
import logo from "../source/img/login_logo.png";
import { Link } from "react-router-dom";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  // const handlerSubmit = () => {
  //   axios
  //     .post("http://localhost:8080/login", { email: email, pass: password })
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // };

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", { email: email, pass: password })
      .then((response) => {
        if (response.status === 200 && response.data !== " ") {
          sessionStorage.setItem("token", response.data);
          history.push("/");
        } else {
          sessionStorage.clear();
        }
        // console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        sessionStorage.clear();
      });
  };

  return (
    <>
      <div className={style.All_box}>
        <div className={style.login_box}>
          <img src={logo} className={style.Logo} alt="로고" />
          <span className="logintext">가입한 계정으로 로그인</span>
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
          <button className={[style.g_join, style.btn_bb].join(" ")}>
            <img src={require("../source/img/gg2.png")} alt="구글 로그인" />
          </button>
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
