import axios from 'axios';
import { BIDDING_URL } from '../../utils/urls';

const placeBid = async (bidData) => {
  const response = await axios.post(`${BIDDING_URL}`, bidData);
  return response.data;
};

export const getBiddingHistory = async (productId) => {
  const response = await axios.get(`${BIDDING_URL}/${productId}/history`);
  return response.data;
};

const sellProduct = async (productId) => {
  const response = await axios.post(`${BIDDING_URL}/${productId}/sell`);
  return response.data;
};

const biddingService = { placeBid, getBiddingHistory, sellProduct };

export default biddingService;
