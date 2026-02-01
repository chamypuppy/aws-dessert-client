import { useState, useEffect } from 'react';
import axios from 'axios';

const useToggle = (likeOrScrapType, commonPkId, userPkId) => {
  const [isToggled, setIsToggled] = useState(false); // 현재 상태 (좋아요 or 스크랩)
  const [count, setCount] = useState(0); // 개수 (좋아요 or 스크랩 개수)

  // 상태 확인 (좋아요 또는 스크랩)
  useEffect(() => {
    const fetchStatusAndCount = async () => {
      try {
        // 공통 API: likeOrScrapType에 따라 요청 경로 변경
        const statusRes = await axios.get(`/api/${likeOrScrapType}?id=${commonPkId}&userPkId=${userPkId}`);
        const countRes = await axios.get(`/api/${likeOrScrapType}/${commonPkId}/count`);
        setIsToggled(statusRes.data.isToggled); // 상태 설정
        setCount(countRes.data.count); // 개수 설정
      } catch (error) {
        console.error(`${likeOrScrapType} 상태 확인 실패:`, error);
      }
    };

    fetchStatusAndCount();
  }, [likeOrScrapType, commonPkId, userPkId]);

  // 상태 토글 함수
  const toggleState = async () => {
    try {
      if (isToggled) {
        await axios.delete(`/api/${likeOrScrapType}`, { data: { userPkId, id: commonPkId } });
        setIsToggled(false);
        setCount((prev) => prev - 1);
      } else {
        await axios.post(`/api/${likeOrScrapType}`, { userPkId, id: commonPkId });
        setIsToggled(true);
        setCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error(`${likeOrScrapType} 토글 실패:`, error);
    }
  };

  return { isToggled, count, toggleState };
};

export default useToggle;
