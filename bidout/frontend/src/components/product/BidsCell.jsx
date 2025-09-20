import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { getBiddingHistory } from '../../redux/services/biddingService';

const BidsCell = ({ productId }) => {
  const [bids, setBids] = useState([]);

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

  return (
    <>
      {bids && bids.length > 0 ? (
        <div className='flex items-center gap-2'>
          <img
            src={bids[0]?.user?.photo}
            alt={bids[0]?.user?.name}
            className='w-10 h-10 rounded-full object-cover'
          />
          <div className='flex flex-col'>
            <span>{bids[0]?.user?.name}</span>
            <span className='font-bold'>${bids[0]?.price?.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        'No bids'
      )}
    </>
  );
};

export default BidsCell;

BidsCell.propTypes = {
  productId: PropTypes.any,
};
