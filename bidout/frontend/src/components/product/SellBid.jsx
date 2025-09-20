import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBiddingHistory } from '../../redux/services/biddingService';
import { sellProduct } from '../../redux/reducers/biddingSlice';
import { getMyProducts } from '../../redux/reducers/productSlice';
import { Loader } from '../common/Loader';

const SellBid = ({ productId }) => {
  const [bids, setBids] = useState([]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.bidding);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await getBiddingHistory(productId);
        if (res.success) {
          setBids(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBids();
  }, [productId]);

  const handleSellProduct = async () => {
    await dispatch(sellProduct(productId));
    await dispatch(getMyProducts());
  };

  return (
    <>
      {isLoading && <Loader />}
      {bids && bids.length > 0 && (
        <button
          onClick={handleSellProduct}
          className='bg-green text-white rounded-md px-3 py-2'
        >
          Sell
        </button>
      )}
    </>
  );
};

export default SellBid;

SellBid.propTypes = {
  productId: PropTypes.any,
};
