import axios from 'axios';
import { PRODUCT_URL } from '../../utils/urls';

const createProduct = async (formData) => {
  const response = await axios.post(`${PRODUCT_URL}`, formData);
  return response.data;
};

const getMyProducts = async () => {
  const response = await axios.get(`${PRODUCT_URL}/users/loggedIn`);
  return response.data;
};

const getMyWonProducts = async () => {
  const response = await axios.get(`${PRODUCT_URL}/users/loggedIn/won`);
  return response.data;
};

const getAllProducts = async () => {
  const response = await axios.get(`${PRODUCT_URL}`);
  return response.data;
};

const getFilteredProducts = async (query) => {
  const response = await axios.get(`${PRODUCT_URL}/search${query}`);
  return response.data;
};

const getVerifiedProducts = async () => {
  const response = await axios.get(`${PRODUCT_URL}/verified`);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${PRODUCT_URL}/${id}`);
  return response.data;
};

const updateProduct = async (id, formData) => {
  const response = await axios.put(`${PRODUCT_URL}/${id}`, formData);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${PRODUCT_URL}/${id}`);
  return response.data;
};

const verifyProductByAdmin = async (id, formData) => {
  const response = await axios.patch(
    `${PRODUCT_URL}/admin/${id}/verify`,
    formData
  );
  return response.data;
};

const deleteProductByAdmin = async (id) => {
  const response = await axios.delete(`${PRODUCT_URL}/admin/${id}/delete`);
  return response.data;
};

const productService = {
  createProduct,
  getMyProducts,
  getMyWonProducts,
  getAllProducts,
  getFilteredProducts,
  getVerifiedProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  verifyProductByAdmin,
  deleteProductByAdmin,
};

export default productService;
