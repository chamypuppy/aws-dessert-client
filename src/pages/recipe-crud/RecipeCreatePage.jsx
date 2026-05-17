import { RecipeForm } from './ui/RecipeForm';
import { useCrud } from './model/useCrud';

const RecipeCreatePage = () => {
  const { insertRecipe, loading } = useCrud();

  return (
    <>
      <h3 className="text-center pt-4">레시피 작성하기</h3>
      <RecipeForm
        onSubmit={insertRecipe}
        loading={loading}
        submitLabel="레시피 등록하기"
      />
    </>
  );
};

export default RecipeCreatePage;
