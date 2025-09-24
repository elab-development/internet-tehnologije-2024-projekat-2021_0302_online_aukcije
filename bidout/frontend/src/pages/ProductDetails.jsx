import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { IoChevronForward } from 'react-icons/io5';

import { getRandomPhoto } from '../utils/api';
import { getProduct } from '../redux/reducers/productSlice';
import { getBiddingHistory } from '../redux/reducers/biddingSlice';
import { Body, Caption, Container, Title } from '../components/common/Design';
import { Loader } from '../components/common/Loader';
import AuctionHistory from '../components/product/AuctionHistory';
import PlaceBid from '../components/product/PlaceBid';

const ProductDetails = () => {
  const [randomPhoto, setRandomPhoto] = useState(
    'https://www.red5people.co.uk/wp-content/uploads/sites/246/2019/05/bidding-is-an-art-not-a-lottery.jpg'
  );
  const [activeTab, setActiveTab] = useState('description');
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);
  const { bids } = useSelector((state) => state.bidding);
  const { loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
      dispatch(getBiddingHistory(id));
    }
  }, [id, dispatch]);

  const fetchBids = async () => {
    dispatch(getBiddingHistory(id));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchUnsplashRandomPhoto = async () => {
      if (product?.title) {
        try {
          const res = await getRandomPhoto(product?.title);
          if (res.status !== 403) {
            setRandomPhoto(res);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUnsplashRandomPhoto();
  }, [product]);

  return (
    <>
      {isLoading && <Loader />}
      <div className='mt-20'>
        <div className='w-full h-24 mb-8'>
          <img
            src={randomPhoto}
            alt='randomPhoto'
            className='w-screen h-full object-cover'
          />
        </div>
        <section className='px-8'>
          <Container>
            <div className='breadcrumbs h-10 hidden md:flex items-center gap-5 mb-4'>
              <Link to='/'>Home</Link>
              <IoChevronForward />
              <Link to='/products'>Products</Link>
              <IoChevronForward />
              <Link to={`/products/${product?._id}`}>{product?.title}</Link>
            </div>
            <div className='flex justify-between flex-col lg:flex-row gap-8'>
              <div className='lg:w-1/2'>
                <div className='h-[70vh]'>
                  <img
                    src={product?.image?.filePath}
                    alt={product?.title}
                    className='w-full h-full object-cover rounded-xl'
                  />
                </div>
              </div>
              <div className='lg:w-1/2'>
                <Title level={2} className='capitalize'>
                  {product?.title}
                </Title>
                <div className='flex gap-5'>
                  <div className='flex text-green'>
                    <IoIosStar size={20} />
                    <IoIosStar size={20} />
                    <IoIosStar size={20} />
                    <IoIosStar size={20} />
                    <IoIosStarOutline size={20} />
                  </div>
                </div>
                <br />
                <Body>{product?.description}</Body>
                <br />
                {product?.isSoldout ? (
                  <>
                    <Title level={6} className='font-bold text-red-500'>
                      Sold Out
                    </Title>
                  </>
                ) : (
                  <>
                    <Title level={6} className='flex items-center gap-2'>
                      Price:
                      <span>${product?.price?.toFixed(2)}</span>
                    </Title>
                    <Title level={6} className='flex items-center gap-2'>
                      Current Bid:
                      <span>
                        {bids && bids.length > 0
                          ? `$${bids[0]?.price} (${bids[0]?.user?.name})`
                          : 'None'}
                      </span>
                    </Title>
                  </>
                )}
                {loggedInUser ? (
                  loggedInUser?.role === 'buyer' ? (
                    <>
                      {product?.isVerified && !product?.isSoldout && (
                        <PlaceBid
                          productId={product?._id}
                          price={product?.price}
                          currentBid={
                            product?.bids?.length > 0
                              ? product?.bids[0].price
                              : 0
                          }
                          fetchBids={fetchBids}
                        />
                      )}
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <Title level={6}>Please log in to place a Bid</Title>
                )}
              </div>
            </div>

            <div className='details mt-8'>
              <div className='flex items-center gap-5'>
                <button
                  className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                    activeTab === 'description'
                      ? 'bg-green text-white'
                      : 'bg-white'
                  }`}
                  onClick={() => handleTabClick('description')}
                >
                  Description
                </button>
                <button
                  className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                    activeTab === 'auctionHistory'
                      ? 'bg-green text-white'
                      : 'bg-white'
                  }`}
                  onClick={() => handleTabClick('auctionHistory')}
                >
                  Auction History
                </button>
              </div>

              <div className='tab-content mt-8'>
                {activeTab === 'description' && (
                  <div className='description-tab shadow-s3 p-8 rounded-md'>
                    <Title level={4}>Description</Title>
                    <br />
                    <Caption className='leading-7'>
                      {product?.description ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
                    </Caption>
                    <br />
                    <Title level={4}>Product Overview</Title>
                    <div className='flex justify-between gap-5'>
                      <div className='mt-4 capitalize w-1/2'>
                        <div className='flex justify-between border-b py-3'>
                          <Title level={6}>category</Title>
                          <Caption>{product?.category?.title}</Caption>
                        </div>
                        <div className='flex justify-between border-b py-3'>
                          <Title level={6}>height</Title>
                          <Caption>{product?.height} (cm)</Caption>
                        </div>
                        <div className='flex justify-between border-b py-3'>
                          <Title level={6}>length</Title>
                          <Caption>{product?.length} (cm)</Caption>
                        </div>
                        <div className='flex justify-between border-b py-3'>
                          <Title level={6}>width</Title>
                          <Caption>{product?.width} (cm)</Caption>
                        </div>
                        <div className='flex justify-between border-b py-3'>
                          <Title level={6}>weigth</Title>
                          <Caption>{product?.weight} (kg)</Caption>
                        </div>
                        <div className='flex justify-between py-3 border-b'>
                          <Title level={6}>medium used</Title>
                          <Caption>{product?.mediumUsed}</Caption>
                        </div>
                        <div className='flex justify-between py-3 border-b'>
                          <Title level={6}>Price</Title>
                          <Caption>${product?.price?.toFixed(2)}</Caption>
                        </div>
                        <div className='flex justify-between py-3 border-b'>
                          <Title level={6}>Sold out</Title>
                          {product?.isSoldout ? 'Yes' : 'No'}
                        </div>
                        <div className='flex justify-between py-3 border-b'>
                          <Title level={6}>Verified</Title>
                          {product?.isVerified ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div className='w-1/2'>
                        <div className='h-[60vh] p-2 bg-green rounded-xl'>
                          <img
                            src={product?.image?.filePath}
                            alt={product?.title}
                            className='w-full h-full object-cover rounded-xl'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'auctionHistory' && (
                  <AuctionHistory bids={bids} />
                )}
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default ProductDetails;
