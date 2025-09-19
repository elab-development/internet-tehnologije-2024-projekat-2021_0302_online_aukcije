import axios from 'axios';
import { CATEGORY_URL } from '../../utils/urls';

const createCategory = async (formData) => {
  const response = await axios.post(`${CATEGORY_URL}`, formData);
  return response.data;
};

const getAllCategories = async () => {
  const response = await axios.get(`${CATEGORY_URL}`);
  return response.data;
};

const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`${CATEGORY_URL}/${categoryId}`);
  return response.data;
};

const categoryService = {
  createCategory,
  getAllCategories,
  deleteCategory,
};

export default categoryService;
