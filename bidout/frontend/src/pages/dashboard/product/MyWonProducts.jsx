import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRedirectNonBuyerUser } from '../../../hooks/useRedirectNonBuyerUser';
import { getMyWonProducts } from '../../../redux/reducers/productSlice';
import { Title } from '../../../components/common/Design';
import { Loader } from '../../../components/common/Loader';
import WonProductsTable from '../../../components/product/WonProductsTable';

const MyWonProducts = () => {
  useRedirectNonBuyerUser('/dashboard');
  const dispatch = useDispatch();
  const { wonProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getMyWonProducts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <section className='shadow-s1 p-8 rounded-lg'>
        <div className='flex justify-between'>
          <Title level={5} className=' font-normal'>
            Won Bids
          </Title>
        </div>
        <hr className='my-5' />
        <WonProductsTable products={wonProducts} />
      </section>
    </>
  );
};

export default MyWonProducts;
