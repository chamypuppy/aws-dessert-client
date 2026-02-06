import { useEffect, useState } from "react";
import axios from 'axios';
 
export const useListRecipe = (keyword) => {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const recipeListAsync = async () =>
      {
        try {
            setLoading(true);

            // true: 검색결과   false: 전체레시피 리스트

            const isKeyword = keyword
            ? `${process.env.REACT_APP_SERVER_URL}/api/recipe/search?keyword=${encodeURIComponent(keyword)}`
            : `${process.env.REACT_APP_SERVER_URL}/api/recipe`;

            const response = await axios.get(isKeyword);
            setRecipeList(response.data);
            console.log('useRecipeList 데이터: ' + JSON.stringify(response.data, null, 2));
          } catch (err) {
            console.error('useListRecipe 에러: ', err);
            setError('🟡 useListRecipe 에러:' ,err);
          } finally {
            setLoading(false);
          };
      };

      recipeListAsync(); // from. useEffect      to. 자동 호출
  }, [keyword]); 
  
  return {
    recipeList,
    loading,
    error
  };
};