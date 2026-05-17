import axios from 'axios';

const BASE = process.env.REACT_APP_SERVER_URL;

const withCredentials = { withCredentials: true };
const multipartHeaders = { headers: { 'Content-Type': 'multipart/form-data' } };

export const recipeApi = {
  insert: (formData) =>
    axios.post(`${BASE}/api/recipe/add`, formData, {
      ...withCredentials,
      ...multipartHeaders,
    }),

  update: (recipe_pk_id, formData) =>
    axios.put(`${BASE}/api/recipe/${recipe_pk_id}`, formData, {
      ...withCredentials,
      ...multipartHeaders,
    }),

  delete: (recipe_pk_id) =>
    axios.delete(`${BASE}/api/recipe/${recipe_pk_id}`, withCredentials),
};
