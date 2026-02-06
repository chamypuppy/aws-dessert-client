import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({
    login_id: "", login_pwd: ""
  })
  const navigate = useNavigate();

  // 카카오 로그인 버튼 클릭 시 백엔드 서버의 로그인 엔드포인트로 이동
  const btnKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/api/kakao/login`;
  };

   // 로그인 후 사용자 정보 받기
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/kakao/request/redirect_uri`, {
        method: 'GET',
        credentials: 'include', // 쿠키 기반 인증을 사용할 경우
      });
      const data = await response.json();
      if (data.accessToken) {
        console.log("받은 Access Token:", data.accessToken);

        // 🔥 Access Token을 localStorage에 저장
        localStorage.setItem("kakao_access_token", data.accessToken);
      }

      /* if (data.user) {
        setUserInfo(data.user); // 사용자 정보 상태에 저장
      } */

    } catch (error) {
      console.error('사용자 정보 요청 실패:', error);
    }
  }; 


   // 컴포넌트가 렌더링된 후, 카카오 인증 후 
   // 카카오가 파라미터로 보낸 리디렉트 URI 뒷편에 붙인 인증코드 추출 작업(server에서 하고 있으므로 주석 처리)
/*    useEffect(() => {
    // query string에서 code를 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    if (!authCode) {
      console.log('카카오 인증 코드가 없습니다.');
      // 코드가 있을 경우 사용자 정보를 가져옴 (지금은 반대경우)
    }
  }, []); // 빈 배열로 첫 렌더링 시 한번만 실행되도록 설정 
*/

// 🔹 3️⃣ 컴포넌트 마운트 시, Access Token을 가져와 사용자 정보 요청
useEffect(() => {
  fetchUserInfo();
}, []);

/* 일반 로그인 */
function onChangeInput(e) {
  let { name:loginKey, value:loginValue } = e.target;

  const emptyCheck = /\s/;
  const korCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  /* 업데이트 전 입력값조사 */
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

async function onClickLoginSubmit(e) {
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


   return (
    <div className='container_login_box'  id='all_container'>
      <div className='login_box'>
        <h2 style={{fontWeight: "bold"}}>로그인</h2>
        <div className='l_box'>
          <h3 style={{fontWeight: "bold"}}>1초만에 회원가입하고 로그인하세요!</h3>
          <h4>다양한 맞춤형 레시피를 알려드릴게요💘</h4>
        </div>
        <button onClick={() => btnKakaoLogin()} className="flex justify-center"
        style={{border:"none", backgroundColor:"transparent"}}>
          <img src='/imgs/kakao_login_medium_wide.webp'
          className='btn_kakao_login'
          alt="카카오 로그인 아이콘" />
        </button>
      </div>

      <hr style={{margin: "50px 30px 80px 30px", color:"lightgray"}}/>

      <form className='px-8 md:px-36'>
        <h2 style={{fontWeight: "bold", marginBottom: "30px", fontSize: "1.2rem"}}>일반 로그인</h2>
        <div className="input-group pb-1.5">
          <input type="text" className="form-control" placeholder="아이디" aria-label="Username" aria-describedby="basic-addon1" id="id" name="login_id" value={loginData.login_id} required onChange={onChangeInput}/>
        </div>
        <div className="input-group pb-4">
          <input type="password" className="form-control" placeholder="비밀번호" aria-label="Username" aria-describedby="basic-addon1" id="pwd" name="login_pwd" value={loginData.login_pwd} required onChange={onChangeInput}/>
        </div>
        <div className="d-grid gap-2 pb-3">
          <Button variant="success" size="lg" onClick={(e) => onClickLoginSubmit(e)}>
            로그인
          </Button>
        </div>
      </form>
        <Link to='/users/signup'>회원가입</Link>
      {/* {userInfo && (
        <div>
          <h3>로그인한 사용자</h3>
          <p>이름: {userInfo.kakao_account.profile.nickname}</p>
          <img src={userInfo.kakao_account.profile.profile_image_url} alt="프로필 이미지" />
        </div>
      )} */}
    </div>
  );
};

export default Login;
