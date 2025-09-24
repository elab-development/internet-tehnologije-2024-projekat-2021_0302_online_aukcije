import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CgDollar } from 'react-icons/cg';

import { useRedirectNonAdminUser } from '../../../hooks/useRedirectNonAdminUser';
import { getTotalIncome } from '../../../redux/reducers/authSlice';
import { Title } from '../../../components/common/Design';

const Income = () => {
  useRedirectNonAdminUser('/dashboard');
  const dispatch = useDispatch();
  const { totalCommission } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTotalIncome());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className='shadow-s1 p-8 rounded-lg  mb-12'>
          <Title level={5} className=' font-normal'>
            Commission Income
          </Title>

          <div className='shadow-s3 py-16 my-16 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-col rounded-xl'>
            <CgDollar size={80} className='text-green' />
            <div>
              <Title level={1}>${totalCommission.toFixed(2)}</Title>
              <Title level={6}>Total Income</Title>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Income;
