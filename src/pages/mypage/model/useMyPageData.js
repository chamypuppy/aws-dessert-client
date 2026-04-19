import { useEffect, useState } from "react";

export function useMyPageData({ navigate }) {
  const [userInfo, setUserInfo] = useState({});
  const [userPkId, setUserPkId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [researchInfo, setResearchInfo] = useState({
    level: "",
    habit: [],
    find: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);

        const sessionRes = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/users/session`,
          {
            method: "GET",
            credentials: "include",
            withCredentials: true,
          }
        );
        const session = await sessionRes.json();

        if (cancelled) return;

        setUserPkId(session.USER_PK_ID);
        setAccessToken(session.ACCESS_TOKEN);

        if (!session.USER_PK_ID) {
          alert("로그인 후 방문해 주세요!");
          navigate("/users/login");
          return;
        }

        const userRes = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/users/${session.USER_PK_ID}`
        );
        const userData = await userRes.json();

        if (cancelled) return;

        setUserInfo(userData.userInfo);
        setResearchInfo({
          level: userData.researchInfo?.level ?? "",
          habit: userData.researchInfo?.habit ?? [],
          find: userData.researchInfo?.find ?? [],
        });
      } catch (error) {
        console.error(
          "🟡 Mypage: 사용자 정보/세션 불러오기 실패:",
          error
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return {
    userInfo,
    setUserInfo,
    userPkId,
    accessToken,
    researchInfo,
    loading,
  };
}
