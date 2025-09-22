import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiMedal } from 'react-icons/ci';
import { GiBarbedStar } from 'react-icons/gi';
import { BsCashCoin } from 'react-icons/bs';
import { MdOutlineCategory } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi2';

import { getLoggedInUser } from '../../redux/reducers/authSlice';
import { Title } from '../../components/common/Design';

const Dashboard = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className='shadow-s1 p-8 rounded-lg  mb-12'>
          <Title level={5} className=' font-normal'>
            {loggedInUser?.role === 'admin' ? 'Activity' : 'My Activity'}
          </Title>
          <hr className='my-5' />

          <div className='grid grid-cols-3 gap-8 mt-8'>
            {loggedInUser?.role === 'seller' && (
              <div className='shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl'>
                <BsCashCoin size={80} className='text-green' />
                <div>
                  <Title level={1}>${loggedInUser?.balance?.toFixed(2)}</Title>
                  <Title level={6}>Balance</Title>
                </div>
              </div>
            )}
            {loggedInUser?.role === 'buyer' && (
              <div className='shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl'>
                <CiMedal size={80} className='text-green' />
                <div>
                  <Title level={1}>{loggedInUser?.productsSoldTo}</Title>
                  <Title level={6}>Items Won</Title>
                </div>
              </div>
            )}
            {loggedInUser?.role === 'seller' && (
              <div className='shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl'>
                <GiBarbedStar size={80} className='text-green' />
                <div>
                  <Title level={1}>{loggedInUser?.productsPostedBy}</Title>
                  <Title level={6}>Your Products </Title>
                </div>
              </div>
            )}
            {loggedInUser?.role === 'admin' && (
              <>
                <div className='shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl'>
                  <MdOutlineCategory size={80} className='text-green' />
                  <div>
                    <Title level={1}>{loggedInUser?.totalProducts}</Title>
                    <Title level={6}>All Products </Title>
                  </div>
                </div>
                <div className='shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl'>
                  <HiOutlineUsers size={80} className='text-green' />
                  <div>
                    <Title level={1}>{loggedInUser?.totalUsers}</Title>
                    <Title level={6}>All Users </Title>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
