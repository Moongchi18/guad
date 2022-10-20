import React from "react";
import styled from "styled-components";
import './Login.css';
import logo from './static/img/logo.jpg';
import './static/font/font.css';
import axios from "axios";
import { useState } from "react";


const Container = styled.div`
  
`;

const Input = styled.input`
box-sizing: border-box;

position: absolute;
font-family: 'SBAggroB';
font-style: normal;
font-weight: 200;
font-size: 20px;
line-height: 24px;
color: #E0E0E0;

`;

const Button = styled.div`

    text-align: center;
 
    background-color: #efefef;
 `;

function Login() {

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const changeEmail = (e) => setEmail(e.target.value);
 const changePassword = (e) => setPassword(e.target.value);
 const handlerSubmit = () => {
        axios.post('http://localhost:8080/login', {"email": email, "pass": password})
        .then(response => console.log(response))
        .catch(error => console.log(error));
    };

  return (
    <>

      <img src={logo} id="Logo" alt="로고"/>
      <span id="logintext">가입한 계정으로 로그인</span>
      <Input id="id" name="id" placeholder="아이디" value={email} onChange={changeEmail} />
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호"
        value={password} onChange={changePassword}
      />
      <Button id="login" onClick={handlerSubmit}>로그인</Button>
      <Button id="join">회원가입</Button>
    </>
  );
}

export default Login;
