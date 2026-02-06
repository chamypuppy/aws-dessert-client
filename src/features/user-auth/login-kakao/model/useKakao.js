import { useEffect } from "react";


export const useKakao = () => {

  const handleKakao = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/api/kakao/login`;
  };

  const fetchKakaoInfo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/kakao/request/redirect_uri`, {
        method: 'GET',
        credentials: 'include', // 쿠키 기반 인증을 사용할 경우
      });
      const data = await response.json();
      if (data.accessToken) {
        console.log("받은 Access Token:", data.accessToken);
        localStorage.setItem("kakao_access_token", data.accessToken);
      }

      /* if (data.user) {
        setUserInfo(data.user); // 사용자 정보 상태에 저장
      } */

    } catch (error) {
      console.error('사용자 정보 요청 실패:', error);
    }
  }; 


  // 컴포넌트 마운트 시, Access Token을 가져와 사용자 정보 요청
  useEffect(() => {
    fetchKakaoInfo();
  }, []);

    return { handleKakao };
  };