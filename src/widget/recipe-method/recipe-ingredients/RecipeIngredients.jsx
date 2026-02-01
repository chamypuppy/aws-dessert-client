export const RecipeIngredients = ({ recipeInfo }) => {

  console.log(recipeInfo);

  return(
    <ul className='m-3 pt-3'>
      <li>
        <h3 className='text-[1.3rem] font-bold'>재료</h3>
        <hr/>
      </li>
      <li>
        <h3 className='mt-3 text-[1.3rem] font-bold'>재료1</h3>
        <div className='mt-6 mb-12 mx-0 whitespace-pre-line'>{recipeInfo.ingredient1}</div>
      </li>
      <li>
        <h3 className='text-[1.3rem] font-bold'>재료2</h3>
        <div className='mt-6 mb-12 mx-0 whitespace-pre-line'>{recipeInfo.ingredient2}</div>
      </li>
    </ul>
  );
};