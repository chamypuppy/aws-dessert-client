
import { useSearch } from "../../features/search-recipe/model/useSearch";
import { List } from "../../shared/ui/List/List";
import { useListRecipe } from "../../entities/recipe/model/useListRecipe";

export const Search = () => {
  // const { searchList, loading, error }  = useSearchResult();
  const { keyword } = useSearch();
  const { recipeList, loading, error } = useListRecipe(keyword);

  
  return(
    <List recipeList={recipeList} loading={loading} error={error}/>
  );

};