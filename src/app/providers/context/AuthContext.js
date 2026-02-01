// context로 만들어야 하나?

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userPkId, setUserPkId] = useState("");
  const [accessToken, setaccessToken] = useState("");

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/users/session`, { withCredentials: true });

        const data = response.data;
        const isLogin = data.isLogin;
        const USER_PK_ID = data.USER_PK_ID;
        const ACCESS_TOKEN = data.ACCESS_TOKEN;

        setIsLoggedIn(isLogin);
        setUserPkId(USER_PK_ID);
        setaccessToken(ACCESS_TOKEN);


      } catch (error) {
        console.error("🟡 로그인 정보 불러오기 실패");
      }
    }
    

    console.log("isLoggedIn: ", isLoggedIn);
    console.log("userPkId: ", userPkId);
    console.log("accessToken: ", accessToken);

    loginCheck();
  }, []);
  
  return(
    <AuthContext.Provider value={{ isLoggedIn, userPkId, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLoginCheck = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('🟡 useLoginCheck 오류: useLoginCheck은 AuthProvider 내에서만 사용 가능');
  }
  return context;
};