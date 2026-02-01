import { useState, useEffect } from 'react';
import axios from 'axios';

// 백엔드 API에서 레시피 데이터 가져오기
export default function useFetchRecipes() {
  const [recipes, setRecipes] = useState([]); // 빈 배열로 초기화 // 각 레시피 모든 정보 저장하려고!
  const [recipeMethods, setRecipeMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 관리

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/recipes/method`);
        //console.log("받은 API DATA확인: ", response.data);
        setRecipes(response.data.recipeResult || []);
        setRecipeMethods(response.data.recipeMethodResult || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []); // 빈배열이라 처음 렌더링될 때 한 번만 실행함

  return { recipes, recipeMethods, isLoading, error };
}