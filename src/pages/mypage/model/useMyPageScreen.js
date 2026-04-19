import { useNavigate } from "react-router-dom";
import { useMyPageData } from "./useMyPageData";
import { useAuth } from "./useAuth";

export function useMyPageScreen() {
  const navigate = useNavigate();
  const { userInfo, userPkId, accessToken } = useMyPageData({ navigate });
  const logout = useAuth({ userPkId, accessToken });

  return {
    userInfo,
    onBack: () => navigate(-1),
    logout,
  };
}
