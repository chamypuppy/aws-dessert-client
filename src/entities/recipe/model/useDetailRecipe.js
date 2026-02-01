import axios from "axios";
import { useEffect, useState } from "react";


export const useDetailRecipe = (recipe_pk_id) => {
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [methodInfo, setMethodInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const detailRecipeAsync = async() => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/recipe/detail/${recipe_pk_id}`, { params: {recipe_pk_id: recipe_pk_id} });

        if(!result) console.log("🟡 useDetailRecipe: data 불러오기 오류");

        setRecipeInfo(result.data.recipeResult[0]); // 단일 객체로 변환
        setMethodInfo(result.data.recipeMethodResult);

        console.log("🍀result.data.recipeResult: ", result.data.recipeResult[0]);
        console.log("🍀result.data.recipeMethodResult: ", result.data.recipeMethodResult);
        

      } catch(error) {
        console.log("🟡 useDetailRecipe: ", error);
        setLoading(false);
        setError(true);
      }
    };

    detailRecipeAsync();

  }, []);
        console.log("🍀recipeInfo: ", recipeInfo);
        console.log("🍀methodInfo: ", methodInfo);

  return { recipeInfo, methodInfo, loading, error };
};