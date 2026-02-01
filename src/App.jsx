import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route , useLocation } from 'react-router-dom';

/* hooks */
import useFetchRecipes from './hooks/useFetchRecipes';
//import useListRecipes from './hooks/useListRecipes';
import { useListRecipe } from "./shared/model/useListRecipe";

/* components */
import Home from './pages/Home';
import Search from './components/common/Search';
// import AddRecipe from './pages/create/AddRecipe';
import Signup from './pages/user/Signup';
import DetailRecipe from './pages/recipe/DetailRecipe';
import Login from './pages/user/Login';
import MyPage from './pages/user/MyPage';
import Research from './pages/user/Research';
import { Footer } from './components/common/Footer';
import { DragBackButton } from './components/common/DragBackButton';
import { DragHomebtn } from './components/common/DragHomebtn';
import { PlusButton } from './components/common/PlusButton';
import { HomeButton } from './components/common/HomeButton';
import { LaterResearchBtn } from './components/common/LaterResearchBtn';
import { SubmitResearchBtn } from './components/common/SubmitResearchBtn';
import { SearchResult } from './pages/SearchResult/Search';
import { useSearch } from "./features/search-recipe/model/useSearch";
import { Header } from './widget/header/Header';

function App() {

  /* location: footer 렌더링 관련 */
  const location = useLocation();

  const { recipes: fetchRecipe, 
          recipeMethods, 
          isLoading: fetchRecipeLoading, 
          error: fetchError
        } = useFetchRecipes();

  /* const { recipes: listRecipe, 
          isLoading: listRecipeLoading, 
          error: listError
        } = useListRecipes(); */

  // 로딩 및 에러 상태를 통합 처리
  const isLoading = fetchRecipeLoading /* || listRecipeLoading */;
  const error = fetchError /* || listError */;

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />}/>
        
        <Route path="/recipe/:recipe_pk_id" element={<DetailRecipe recipes={fetchRecipe} recipeMethods={recipeMethods} />} />
        <Route path="/recipe/search" element={<SearchResult/>} /> 
        <Route path="/users/login" element={<Login />} /> 
        <Route path="/users/signup" element={<Signup/>}/>
        <Route path="/users/mypage" element={<MyPage />} /> 
        <Route path="/users/research" element={<Research />} /> 
        
        
      </Routes>
        {location.pathname !== "/users/login" && <Footer />}
        {location.pathname !== "/users/login" && location.pathname !== "/users/signup" && location.pathname !== "/users/research" && (
          <>
            {/* <HomeButton /> */}
            <PlusButton />
            <DragBackButton/>
          </>
        )}
        {location.pathname !== "/users/research" && <HomeButton />}
        {/* {location.pathname === "/users/research" && <DelayResearchBtn/>}
        {location.pathname === "/users/research" && <SubmitResearchBtn/>} */}
        {/* <DragBackButton/> */}
        
    </div>
  );
}

export default App;
