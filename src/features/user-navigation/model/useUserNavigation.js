import { useNavigate } from "react-router-dom";

export const useUserNavigation = (userPkId) => {
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    console.log("유저피케이아이디: ", userPkId);

    userPkId 
    ? navigate('/users/mypage') 
    : navigate('/users/login');

  };
  return {
    handleUserIconClick
  }
};