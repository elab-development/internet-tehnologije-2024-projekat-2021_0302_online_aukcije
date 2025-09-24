import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { createBidding } from '../../redux/reducers/biddingSlice';
import { commonClassNameOfInput } from '../common/Design';
import { Loader } from '../common/Loader';

const PlaceBid = ({ productId, price, currentBid, fetchBids }) => {
  const [bidAmount, setBidAmount] = useState('');

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.bidding);

  const handlePlaceBid = async (e) => {
    e.preventDefault();

    if (!bidAmount || bidAmount <= 0) {
      return toast.error('Please provide a valid bid amount!');
    }
    if (bidAmount <= price) {
      return toast.error('Your bid must be greater than the starting price!');
    }
    if (bidAmount <= currentBid) {
      return toast.error('Your bid must be greater than the current bid!');
    }

    await dispatch(
      createBidding({
        productId,
        price: bidAmount,
      })
    );
    setBidAmount('');
    fetchBids();
  };

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handlePlaceBid} className='p-5 px-10 shadow-s3 py-8 mt-5'>
        <div className='flex gap-3 justify-between'>
          <input
            type='number'
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className={commonClassNameOfInput}
          />
          <button type='submit' className='bg-gray-100 rounded-md px-5 py-3'>
            Bid
          </button>
        </div>
      </form>
    </>
  );
};

export default PlaceBid;

PlaceBid.propTypes = {
  productId: PropTypes.any,
  price: PropTypes.number,
  currentBid: PropTypes.number,
  fetchBids: PropTypes.any,
};
