
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSessionCheck () {

  useEffect(() => { 
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/session`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    })
    .then((response) => response.json())
    .then((data) => {
      setUserPkId(data.USER_PK_ID);
      setAccessToken(data.ACCESS_TOKEN);
      
      console.log("data:", data);
      console.log("userPkId:", data.USER_PK_ID);
      console.log("ACCESS_TOKEN:", data.ACCESS_TOKEN);

      if (!data.USER_PK_ID) { // 서버기준 (state는 x) // !data.isLogin도 ok
        alert("로그인 후 방문해 주세요!");
        return navigate("/users/login");
      }
      
      // 사용자 정보 불러오기
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/${data.USER_PK_ID}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data.userInfo: ", data.userInfo);
          console.log("유저인포:", userInfo);
          console.log("data.researchInfo: ", data.researchInfo);
          setUserInfo(data.userInfo);
          setResearchInfo({
            level: data.researchInfo.level,
            habit: data.researchInfo.habit,
            find: data.researchInfo.find
          });
        })
        .catch((error) => console.error('🟡 안 쪽 catch문 (Mypage): 사용자 정보 불러오기 실패:', error));
            
    })
    .catch((error) => console.error('🟡 첫 번째 catch문 (Mypage): 로그인 상태 확인 오류', error));
  }, []);
    
};