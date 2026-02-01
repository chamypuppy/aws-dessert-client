// import { useListRecipe } from "../../model/useListRecipe";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const List = ({ recipeList, loading, error }) => {

  console.log("Main컴포: ", recipeList);
  return(
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-white px-3" /* className='home_ul' */>
      {recipeList.map((r) => {

      return (
        <li className="relative" key={r.recipe_pk_id}/* className='r_home_list' */>
            <Link to={`/recipe/detail/${r.recipe_pk_id}`}>
              <div className='aspect-[3/2] overflow-hidden flex justify-end items-end'>
                  <img className='w-full h-full rounded-xl' src={`/imgs/${r.recipe_image}`}/>
                  <div className=' absolute'>
                    <FontAwesomeIcon icon={faHeart} className='mr-1 mb-1 cursor-pointer text-2xl' />
                  </div>
              </div>
                  <h4 id='common_recipe_name' className='r_home_name'>{r.recipe_name}</h4>
                  <span className='r_home_au_name'>{r.author_name}</span>
            </Link>
          
        </li> );
      })}
    </ul>
  );
};