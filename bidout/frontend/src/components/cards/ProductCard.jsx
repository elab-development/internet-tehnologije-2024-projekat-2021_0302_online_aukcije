import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiAuctionFill } from 'react-icons/ri';
import { GiTakeMyMoney } from 'react-icons/gi';

import { getBiddingHistory } from '../../redux/services/biddingService';
import { Caption, PrimaryButton, ProfileCard, Title } from '../common/Design';

const ProductCard = ({ product }) => {
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await getBiddingHistory(product._id);
        if (res.success) {
          setBids(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBids();
  }, [product]);

  return (
    <div>
      <div className='bg-white shadow-s1 rounded-xl p-3'>
        <div className='h-56 relative overflow-hidden'>
          <NavLink to={`/products/${product?._id}`}>
            <img
              src={product?.image?.filePath}
              alt={product?.title}
              className='w-full h-full object-cover rounded-xl hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out'
            />
          </NavLink>
          <ProfileCard className='shadow-s1 absolute right-3 bottom-3'>
            <RiAuctionFill size={22} className='text-green' />
          </ProfileCard>
          <div className='absolute top-0 left-0 p-2 w-full'>
            <div className='flex items-center justify-between'>
              {product?.isSoldout ? (
                <Caption className='text-red-500 bg-white px-3 py-1 text-sm rounded-full'>
                  Sold Out
                </Caption>
              ) : (
                <Caption className='text-green bg-white px-3 py-1 text-sm rounded-full'>
                  In Stock
                </Caption>
              )}
              <Caption className='text-green bg-green_100 px-3 py-1 text-sm rounded-full'>
                {product?.bids?.length || 0}
              </Caption>
            </div>
          </div>
        </div>
        <div className='details mt-4'>
          <Title level={6} className='uppercase line-clamp-1'>
            {product?.title}
          </Title>
          <hr className='mt-3' />
          {!product?.isSoldout && (
            <>
              <div className='flex flex-col 2xl:flex-row items-center justify-between py-4'>
                <div className='flex items-center justify-between gap-5'>
                  <div>
                    <RiAuctionFill size={40} className='text-green' />
                  </div>
                  <div>
                    <Caption className='text-green'>Current Bid</Caption>
                    <Title level={6}>
                      <span>
                        {bids && bids.length > 0
                          ? '$' + bids[0]?.price?.toFixed(2)
                          : 'None'}
                      </span>
                    </Title>
                  </div>
                </div>
                <div className='hidden 2xl:block w-[1px] h-10 bg-gray-300'></div>
                <div className='block 2xl:hidden h-[1px] w-10 bg-gray-300'></div>
                <div className='flex items-center justify-between gap-5'>
                  <div>
                    <GiTakeMyMoney size={40} className='text-red-500' />
                  </div>
                  <div>
                    <Caption className='text-green'>Start Price</Caption>
                    <Title level={6}>${product?.price?.toFixed(2)}</Title>
                  </div>
                </div>
              </div>
              <hr />
              <div
                className='flex items-center  justify-between mt-3'
                onClick={() => {
                  navigate(`/products/${product?._id}`);
                }}
              >
                <PrimaryButton className='rounded-lg text-sm w-full'>
                  Place Bid
                </PrimaryButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object,
};
