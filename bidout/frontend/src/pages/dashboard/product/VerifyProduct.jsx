import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRedirectNonAdminUser } from '../../../hooks/useRedirectNonAdminUser';
import { verifyProductByAdmin } from '../../../redux/reducers/productSlice';
import {
  Caption,
  commonClassNameOfInput,
  PrimaryButton,
  Title,
} from '../../../components/common/Design';
import { Loader } from '../../../components/common/Loader';

const VerifyProduct = () => {
  useRedirectNonAdminUser('/dashboard');
  const [commission, setCommision] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.product);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      if (!commission || commission <= 0) {
        return toast.error('Please add valid commission');
      }
      await dispatch(
        verifyProductByAdmin({
          id,
          formData: {
            commission: commission,
          },
        })
      );
      navigate('/dashboard/admin/products');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className='bg-white shadow-s1 p-8 rounded-xl'>
        <Title level={5} className=' font-normal mb-5'>
          Verify Product
        </Title>
        <hr className='my-5' />
        <div className='create-product'>
          <form onSubmit={handleVerify}>
            <div className='w-full'>
              <Caption className='mb-2'>Commission *</Caption>
              <input
                type='number'
                name='commission'
                className={`${commonClassNameOfInput}`}
                value={commission}
                onChange={(e) => setCommision(e.target.value)}
              />
            </div>
            <PrimaryButton type='submit' className='rounded-none my-5'>
              Verify
            </PrimaryButton>
          </form>
        </div>
      </section>
    </>
  );
};

export default VerifyProduct;
