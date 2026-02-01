import { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';

/* 분리 기능 components */
import { useListRecipes } from '../../hooks/useListRecipes';
import { ClickIconSearch } from '../Nav';
import { ListRecipes } from '../ListRecipes';

function Search(){

  const navigate = useNavigate();
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword') || '';
  const { recipes, loading, error } = useListRecipes(keyword);

  const [userPkId, setUserPkId] = useState(null);
  const [likeRecipes, setLikeRecipes] = useState([]);


  /* 세션에 저장된 userPkId 값 가져오기 */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/users/session`, {
      method: 'GET',
      credentials: 'include', // 세션 쿠키 포함 (CORS 설정에 따라 필요)
    })
    .then((response) => response.json())
    .then((data) => {
      //console.log("data:", data);
      //console.log("data isLogin :", data.isLogin);
      
      setUserPkId(data.USER_PK_ID);
    })
    .catch((error) => console.error('로그인 상태 확인 오류:', error));
  }, []);

  /* 레시피의 좋아요 상태 관리 */
  useEffect(() => {
    const fetchLikes = async () => {
      const newLikeRecipes = await Promise.all(
        recipes.map(async (r) => {
          // 서버에서 좋아요 상태 가져오기
          const response = await fetch(`/api/likes?userPkId=${userPkId}&recipePkId=${r.recipe_pk_id}`);
          const data = await response.json();
          return { recipeId: r.recipe_pk_id, isLiked: data.isLiked }; // 각 레시피에 대해 좋아요 상태 저장
        })
      );
      setLikeRecipes(newLikeRecipes); // 상태 업데이트
    };

    if (recipes.length > 0 && userPkId) {
      fetchLikes(); // 좋아요 상태 가져오기
    }
  }, [recipes, userPkId]);

   // 좋아요 토글 함수
  const handleToggleLike = async (recipeId) => {
    if (!userPkId) {
      alert('로그인을 해주세요!');
      return; // 로그인하지 않았으면 함수 종료
    }

    // 좋아요 상태 반전
    const recipe = likeRecipes.find((state) => state.recipeId === recipeId);
    const newIsLiked = !recipe.isLiked;

    // 서버에 좋아요 상태 업데이트 요청
    await fetch('/api/likes', {
      method: newIsLiked ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userPkId, recipePkId: recipeId }),
    });

    // 상태 업데이트
    setLikeRecipes((prevState) =>
      prevState.map((state) =>
        state.recipeId === recipeId
          ? { ...state, isLiked: newIsLiked } // 해당 레시피의 좋아요 상태 반영
          : state
      )
    );
  };


  /* 로그인 기능 관련 식 */
  const clickIconUser = () => {
    console.log(userPkId);
    if (userPkId) {
      // 로그인되어 있으면 Mypage로 이동
      navigate('/users/mypage');
    } else {
      // 로그인되지 않았으면 로그인 페이지로 이동
      navigate('/users/login');
    }
  };

  return(
    <div id='common_container'>
      <ClickIconSearch userPkId={userPkId}/>
      {loading && <p>로딩 중</p>}
      {error && <p>Home 로딩에러 {error}</p>}
      <ListRecipes 
      recipes={recipes}
      likeRecipes={likeRecipes}
      />
    </div>
  )
};

export default Search;