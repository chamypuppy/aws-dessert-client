import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListRecipe } from "../../../entities/recipe/model/useListRecipe";

export const useSearch = () => {
  const [keyword, setKeyword] = useState(''); 
  const navigate = useNavigate();
  
  const { recipeList:searchList, loading, error } = useListRecipe(keyword);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();

    if(!trimmedKeyword) {
      alert("검색어를 입력해 주세요!");
      return;
    };
    
    setKeyword(trimmedKeyword);

    navigate(`/recipe/search?keyword=${encodeURIComponent(trimmedKeyword)}`);
    console.log("검색어: ", trimmedKeyword);

    // useRecipeList(trimmedKeyword);
    

  };

  const onKeyEnter = (e) => {
    if (e.key === 'Enter') {
        handleSearch();
      }
  };
  
  return {
    keyword,
    handleSearchChange,
    handleSearch,
    onKeyEnter,
    
    searchList, 
    loading, 
    error
  };
};