import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRedirectNonAdminUser } from '../../../hooks/useRedirectNonAdminUser';
import {
  deleteProduct,
  deleteProductByAdmin,
  getAllProducts,
} from '../../../redux/reducers/productSlice';
import { Title } from '../../../components/common/Design';
import { Loader } from '../../../components/common/Loader';
import Table from '../../../components/product/Table';

const AllProductsList = () => {
  useRedirectNonAdminUser('/dashboard');
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
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
        dispatch(getAllProducts());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <section className='shadow-s1 p-8 rounded-lg'>
        <div className='flex justify-between'>
          <Title level={5} className=' font-normal'>
            All Products
          </Title>
        </div>
        <hr className='my-5' />
        <Table
          products={products}
          isAdmin={true}
          handleDeleteProduct={handleDeleteProduct}
        />
      </section>
    </>
  );
};

export default AllProductsList;
