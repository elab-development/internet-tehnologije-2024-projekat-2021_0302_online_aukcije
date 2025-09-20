import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';

import { useRedirectNonSellerUser } from '../../../hooks/useRedirectNonSellerUser';
import {
  deleteProduct,
  deleteProductByAdmin,
  getMyProducts,
} from '../../../redux/reducers/productSlice';
import { PrimaryButton, Title } from '../../../components/common/Design';
import { Loader } from '../../../components/common/Loader';
import Table from '../../../components/product/Table';

const MyProducts = () => {
  useRedirectNonSellerUser('/dashboard');
  const dispatch = useDispatch();
  const { userProducts, isLoading } = useSelector((state) => state.product);
  const { loggedInUser } = useSelector((state) => state.auth);

  const handleDeleteProduct = async (id) => {
    try {
      if (loggedInUser) {
        if (loggedInUser?.role === 'admin') {
          await dispatch(deleteProductByAdmin(id));
        } else if (loggedInUser?.role === 'seller') {
          await dispatch(deleteProduct(id));
        } else {
          toast.error('Unauthorized action');
        }
        dispatch(getMyProducts());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <section className='shadow-s1 p-8 rounded-lg'>
        <div className='flex justify-between'>
          <Title level={5} className=' font-normal'>
            My Products
          </Title>
          <NavLink to='/dashboard/products/create'>
            <PrimaryButton className='flex items-center gap-3 px-5 py-2 text-sm rounded-md transition-transform hover:scale-105'>
              <AiOutlinePlus size={20} />
              <span>Create Product</span>
            </PrimaryButton>
          </NavLink>
        </div>
        <hr className='my-5' />
        <Table
          products={userProducts}
          isAdmin={loggedInUser?.role === 'admin'}
          handleDeleteProduct={handleDeleteProduct}
        />
      </section>
    </>
  );
};

export default MyProducts;
