import { useState, useEffect } from 'react';
import axios from 'axios';

export const useListRecipes = (keyword) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const listRecipes = async () => {
      try {
        setLoading(true);

        const chooseUrl = keyword.trim()
        ? `${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/recipes/search?keyword=${encodeURIComponent(keyword)}`
        : `${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/recipes`;

        /* const response = await axios.get(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/recipes`); // db 주소 제대로 쓰기
        console.log(response.data); */

        const response = await axios.get(chooseUrl);
        setRecipes(response.data);
        console.log('useListRecipe값: ' + response.data);

      } catch (err) {
        console.error(err);
        setError('💦useListRecipes 에러: 레시피를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    listRecipes();
  }, [keyword]);

  return { recipes, loading, error };
};
