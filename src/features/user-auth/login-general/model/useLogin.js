import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogin = () => {
  const [loginData, setLoginData] = useState({
    login_id: "", login_pwd: ""
  });

  const navigate = useNavigate();

  function onChangeInput(e) {
    let { name:loginKey, value:loginValue } = e.target;

    const emptyCheck = /\s/;
    const korCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    /* 업뎃 전 입력값조사 */
    if(emptyCheck.test(loginValue)) {
      alert("공백 입력은 불가합니다.");
      loginValue = loginValue.replace(emptyCheck, "");
      return;
    }
    if(korCheck.test(loginValue) && loginKey === "login_id") {
      alert("영문, 숫자만 입력 가능합니다.");
      loginValue = loginValue.replace(korCheck, "");
      return;
    }

    //console.log(e.target.value);
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [loginKey] : loginValue
    }));
  }
  console.log(loginData);

  async function onSubmitLogin(e) {
    e.preventDefault();
    if(!loginData.login_id) {
      alert("아이디를 입력해 주세요.");
      return;
    }
    if(!loginData.login_pwd) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const loginResult = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login/register`, loginData, { withCredentials: true });

      console.log("결과값:",loginResult);
      console.log("결과값2:",loginResult.data.success);
      console.log("결과값3:",loginResult.data.message);
      console.log("결과값4:",loginData);

      if(loginResult.data.success) {    // 로그인 성공
          alert(loginResult.data.message);
          navigate("/");
        }
      else {
        alert(loginResult.data.message);
      }
      
      if(loginResult.data.noExisting){
        alert(loginResult.data.failedMessage);
      }


    } catch(err) {
      console.error("🟡 Login.jsx 오류: 다시시도 해 주세요.");
      console.error(err);

        if(err.response) {
          const errorMessage = err.response.data;
          //const statusCode = err.response.status;
          //setLoginErrorMessage(errorMessage);
          console.log("🟡 ", errorMessage);
          return;
        };
    }
    
  }

  return { loginData, onChangeInput, onSubmitLogin };
};