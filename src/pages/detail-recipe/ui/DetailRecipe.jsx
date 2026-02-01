import { useDetailRecipe } from "../../../entities/recipe/model/useDetailRecipe";
import { useParams } from "react-router-dom";
import { RecipeHeader } from "../../../widget/recipe-method/recipe-header/ui/RecipeHeader";
import { AuthorInfo } from "../../../widget/recipe-method/author-info/ui/AuthorInfo";
import { useAuthor } from "../../../entities/recipe/model/useAuthor";
import { RecipeIngredients } from "../../../widget/recipe-method/recipe-ingredients/RecipeIngredients";
import { RecipeSteps } from "../../../widget/recipe-method/recipe-steps/RecipeSteps";
import { RecipeTips } from "../../../widget/recipe-method/recipe-tips/RecipeTips";
import { RecipeTags } from "../../../widget/recipe-method/recipe-tags/RecipeTags";
import { Footer } from "../../../widget/footer/Footer";

function DetailRecipe () {
  const { recipe_pk_id } = useParams(); 
  const { recipeInfo, methodInfo, loading, error } = useDetailRecipe(recipe_pk_id);
  // const {} = useAuthor(recipeInfo.author_id);

  console.log(recipe_pk_id);
  console.log(recipeInfo.recipe_pk_id);

  return(
    <div key={recipeInfo.recipe_pk_id} className="max-w-2xl mx-auto bg-white">
      {/* <span>{recipeInfo.recipe_pk_id}</span> */}
      {/* <span>{methodInfo}</span> */}
      {/* <DragBackButton /> */}
      
      {/* Widget */}
      <RecipeHeader recipeInfo={recipeInfo}/>
      <AuthorInfo recipeInfo={recipeInfo} />
      <RecipeIngredients recipeInfo={recipeInfo} /> {/* props name 중요 */}
      <RecipeSteps methodInfo={methodInfo} />
      <RecipeTips recipeInfo={recipeInfo}/>
      <RecipeTags recipeInfo={recipeInfo}/>
      <Footer/>
      {/* 
      <RecipeInfo recipe={recipe} />
      <AuthorInfo usersInfo={usersInfo} authorId={recipe.author_id} />
      
      
      <RecipeTips tips={recipe.tips} />
      <RecipeTags tags={recipe.tags} /> */}
    </div>
  );
};

export default DetailRecipe;