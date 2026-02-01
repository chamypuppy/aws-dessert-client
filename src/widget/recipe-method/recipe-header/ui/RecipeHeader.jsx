import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie } from '@fortawesome/free-solid-svg-icons';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Separator } from '../../../../shared/ui/separator/Separator';

export const RecipeHeader = ({ recipeInfo }) => {
  return(
    <>
      <div className='max-w-2xl mx-auto bg-white'>
        <img className='w-full h-full' src={`/imgs/${recipeInfo.recipe_image}`}/>
          
        <div className='m-3'>
          <div className='mb-4'>
            <h1 className='text-lg sm:text-xl font-semibold leading-[2] md:leading-[2]'>{recipeInfo.recipe_name}</h1>
            <span className='text-sm sm:text-base'>{recipeInfo.recipe_intro}</span>
          </div>
          <div className='flex justify-around text-center pb-3'>
            <div className=''>
              <div><FontAwesomeIcon icon={faCookie} /></div>
              <div>{recipeInfo.recipe_servings}개 분량</div>
            </div>
            <div className=''>
              <div><FontAwesomeIcon icon={faChessRook} /></div>
              <div>{
                    recipeInfo.baking_level === 0 
                  ? '입문용'
                  : recipeInfo.baking_level === 1
                  ? '초급'
                  : recipeInfo.baking_level === 2
                  ? '초중급'
                  : recipeInfo.baking_level === 3
                  ? '중급'
                  : recipeInfo.baking_level === 4
                  ? '중상급'
                  : '마스터'
                }</div>
            </div>
            <div className=''>
                <div><FontAwesomeIcon icon={faHeart} /></div>
                <div>{recipeInfo.scrap_count}</div>
                {/* <div>{
                    recipeInfo.scrap_count === 0
                    ? ''
                    : recipeInfo.scrap_count
              }</div> */}
            </div>
          </div>            
        </div>
      </div>
      <Separator/>
    </>
  );
};