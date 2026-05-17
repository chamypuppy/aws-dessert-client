import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeApi } from '../api/recipeApi';

export const useCrud = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildFormData = ({ title, image, description, category, ingredients, steps, tip, tags }) => {
    const formData = new FormData();
    formData.append('recipe_name', title);
    formData.append('recipe_intro', description);
    formData.append('recipe_servings', '');
    formData.append('baking_level', '');
    formData.append('category_big', category.large);
    formData.append('category_middle', category.medium);
    formData.append('category_machine', category.small);
    formData.append('ingredient1', ingredients.ingredient1);
    formData.append('ingredient2', ingredients.ingredient2);
    formData.append('tips', tip);
    formData.append('tags', JSON.stringify(tags));
    formData.append('steps', JSON.stringify(steps));
    if (image) formData.append('image', image);
    return formData;
  };

  const insertRecipe = async (fields) => {
    try {
      setLoading(true);
      setError(null);
      const formData = buildFormData(fields);
      const res = await recipeApi.insert(formData);
      alert('레시피가 등록되었습니다!');
      navigate(`/recipe/detail/${res.data.recipe_pk_id}`);
    } catch (err) {
      console.error('💦 레시피 등록 오류:', err);
      setError(err);
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const updateRecipe = async (recipe_pk_id, fields) => {
    try {
      setLoading(true);
      setError(null);
      const formData = buildFormData(fields);
      await recipeApi.update(recipe_pk_id, formData);
      alert('레시피가 수정되었습니다!');
      navigate(`/recipe/detail/${recipe_pk_id}`);
    } catch (err) {
      console.error('💦 레시피 수정 오류:', err);
      setError(err);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (recipe_pk_id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      setLoading(true);
      setError(null);
      await recipeApi.delete(recipe_pk_id);
      alert('레시피가 삭제되었습니다.');
      navigate('/');
    } catch (err) {
      console.error('💦 레시피 삭제 오류:', err);
      setError(err);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return { insertRecipe, updateRecipe, deleteRecipe, loading, error };
};
