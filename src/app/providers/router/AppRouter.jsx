import { Routes, Route, useLocation } from 'react-router-dom';
// import { Home }
import { Main } from "../../../pages/main/ui/Main";
import DetailRecipe from "../../../pages/detail-recipe/ui/DetailRecipe";
import { Search } from '../../../pages/SearchResult/Search';
import { Login } from '../../../pages/login/ui/Login';

export const AppRouter = () => {

  /* location: footer 렌더링 관련 */
    const location = useLocation();

  return(
    <>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/recipe/detail/:recipe_pk_id" element={<DetailRecipe />}/>
        <Route path="/recipe/search" element={<Search />}/>
        <Route path="/users/login" element={<Login />} />

        {/* <Route path="/recipe/:recipe_pk_id" element={<DetailRecipe recipes={fetchRecipe} recipeMethods={recipeMethods} />} />
          
          <Route path="/users/signup" element={<Signup/>}/>
          <Route path="/users/mypage" element={<MyPage />} />
          <Route path="/users/research" element={<Research />} /> */}
      </Routes>

      {/* {location.pathname !== "/users/login" && <Footer />}
      {location.pathname !== "/users/login" && location.pathname !== "/users/signup" && location.pathname !== "/users/research" && (
        <>
          <PlusButton />
          <DragBackButton/>
        </>
      )}
      {location.pathname !== "/users/research" && <HomeButton />} */}
    </>
  );
};