import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useAuth({ userPkId, accessToken }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function submitKakaoLogout() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/kakao/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log("로그아웃 응답:", result);

      if (response.ok) {
        alert("로그아웃 되었습니다!");
        window.location.href = "/";
      } else {
        alert("로그아웃에 실패하였습니다." + result.message);
      }
    } catch (error) {
      console.error("react 로그아웃 요청 실패:", error);
    }
  }

  async function submitPrimaryLogout() {
    if (!userPkId) {
      alert("세션이 만료되었습니다");
      navigate("/");
      return;
    }

    try {
      const primaryLogoutResults = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/logout`,
        null,
        { withCredentials: true }
      );

      if (primaryLogoutResults.data.success) {
        alert(primaryLogoutResults.data.message);
        navigate("/");
      }
    } catch (err) {
      const errorMessage = err?.response?.data;
      console.log("🟡 ", errorMessage);
    }
  }

  function handleConfirm() {
    handleClose();
    if (!accessToken) submitPrimaryLogout();
    else submitKakaoLogout();
  }

  return {
    show,
    handleClose,
    handleShow,
    handleConfirm,
  };
}
