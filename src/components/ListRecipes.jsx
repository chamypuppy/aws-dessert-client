import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBookmark, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';  // 아이콘 추가

export const ListRecipes = ({recipes, likeRecipes, clickToggleLike }) => {
  if (!recipes || recipes.length === 0) return <div>레시피가 없습니다.</div>;

  return(
    <ul className='home_ul'>
      {recipes.map((r) => {
        // 각 레시피의 좋아요 상태를 확인
        const recipeLike = likeRecipes.find((item) => item.recipeId === r.recipe_pk_id);

      return (
        <li key={r.recipe_pk_id} className='r_home_list'>
          <a href={`/recipe/${r.recipe_pk_id}`}>
            <img src={`/imgs/${r.recipe_image}`}/>
            <h4 id='common_recipe_name' className='r_home_name'>{r.recipe_name}</h4>
            <span className='r_home_au_name'>{r.author_name}</span>
          </a>
          <div className='like_box'>
            <FontAwesomeIcon icon={faHeart} className='icon_like'
            style={{ color: recipeLike?.isLiked ? 'red' : 'lightgray' }}
            onClick={() => clickToggleLike(r.recipe_pk_id)}
            />
          </div>
        </li> );
      })}
    </ul>
  );
}