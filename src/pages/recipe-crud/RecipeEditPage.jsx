import { useParams } from 'react-router-dom';
import { RecipeForm } from './ui/RecipeForm';
import { useCrud } from './model/useCrud';
import { useDetailRecipe } from '../../entities/recipe/model/useDetailRecipe';

const RecipeEditPage = () => {
  const { recipe_pk_id } = useParams();
  const { recipeInfo, methodInfo, loading: fetchLoading } = useDetailRecipe(recipe_pk_id);
  const { updateRecipe, deleteRecipe, loading: crudLoading } = useCrud();

  if (fetchLoading) return <p className="text-center pt-5">불러오는 중...</p>;

  const initialData = {
    ...recipeInfo,
    steps: methodInfo
      .sort((a, b) => a.method_number - b.method_number)
      .map((m) => m.method),
  };

  const handleUpdate = (fields) => updateRecipe(recipe_pk_id, fields);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-4 pt-4">
        <h3 className="mb-0">레시피 수정하기</h3>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => deleteRecipe(recipe_pk_id)}
          disabled={crudLoading}
        >
          삭제
        </button>
      </div>

      <RecipeForm
        initialData={initialData}
        onSubmit={handleUpdate}
        loading={crudLoading}
        submitLabel="수정 완료"
      />
    </>
  );
};

export default RecipeEditPage;
