import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRedirectNonSellerUser } from '../../../hooks/useRedirectNonSellerUser';
import { getAllCategories } from '../../../redux/reducers/categorySlice';
import { updateProduct } from '../../../redux/reducers/productSlice';
import productService from '../../../redux/services/productService';
import {
  Caption,
  commonClassNameOfInput,
  PrimaryButton,
  Title,
} from '../../../components/common/Design';
import { Loader } from '../../../components/common/Loader';

const initialState = {
  title: '',
  description: '',
  price: '',
  height: '',
  lengthPic: '',
  width: '',
  mediumUsed: '',
  weight: '',
  category: null,
};

const EditProduct = () => {
  useRedirectNonSellerUser('/dashboard');
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.product);

  const [localLoading, setLocalLoading] = useState(false);
  const [productData, setProductData] = useState(initialState);

  const {
    title,
    description,
    price,
    height,
    lengthPic,
    width,
    mediumUsed,
    weight,
  } = productData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('lengthPic', productData.lengthPic);
    formData.append('height', productData.height);
    formData.append('width', productData.width);
    formData.append('weight', productData.weight);
    formData.append('mediumUsed', productData.mediumUsed);

    await dispatch(
      updateProduct({
        id,
        formData,
      })
    );
    navigate('/dashboard/products/my');
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLocalLoading(true);
        const res = await productService.getProduct(id);
        setProductData(res.data);
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong!');
      } finally {
        setLocalLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, dispatch]);

  return (
    <>
      {(isLoading || localLoading) && <Loader />}
      <section className='bg-white shadow-s1 p-8 rounded-xl'>
        <Title level={5} className=' font-normal mb-5'>
          Update Product
        </Title>
        <hr className='my-5' />
        <form onSubmit={handleUpdateProduct}>
          <div className='w-full'>
            <Caption className='mb-2'>Title *</Caption>
            <input
              type='text'
              name='title'
              className={`${commonClassNameOfInput}`}
              placeholder='Title'
              value={title}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex items-center gap-5 my-4'>
            <div className='w-1/2'>
              <Caption className='mb-2'>Height (cm) </Caption>
              <input
                type='number'
                name='height'
                placeholder='Height'
                className={`${commonClassNameOfInput}`}
                value={height}
                onChange={handleInputChange}
              />
            </div>
            <div className='w-1/2'>
              <Caption className='mb-2'>Length (cm) </Caption>
              <input
                type='number'
                name='lengthPic'
                placeholder='Length'
                className={`${commonClassNameOfInput}`}
                value={lengthPic}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='flex items-center gap-5 my-4'>
            <div className='w-1/2'>
              <Caption className='mb-2'>Width (cm) </Caption>
              <input
                type='number'
                name='width'
                placeholder='Width'
                className={`${commonClassNameOfInput}`}
                value={width}
                onChange={handleInputChange}
              />
            </div>
            <div className='w-1/2'>
              <Caption className='mb-2'>
                Medium used{' '}
                <span className='italic'>(Paint, pencil, ink...)</span>
              </Caption>
              <input
                type='text'
                name='mediumUsed'
                placeholder='Medium used'
                className={commonClassNameOfInput}
                value={mediumUsed}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='flex items-center gap-5 mt-4'>
            <div className='w-1/2'>
              <Caption className='mb-2'>
                Weight of piece <span className='italic'>(kg)</span>
              </Caption>
              <input
                type='number'
                name='weight'
                placeholder='Weight'
                className={`${commonClassNameOfInput}`}
                value={weight}
                onChange={handleInputChange}
              />
            </div>
            <div className='w-1/2'>
              <Caption className='mb-2'>Price *</Caption>
              <input
                type='number'
                name='price'
                className={`${commonClassNameOfInput}`}
                placeholder='Price'
                value={price}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Caption className='mt-6 mb-2'>Description *</Caption>
            <input
              type='text'
              name='description'
              placeholder='Description'
              className={commonClassNameOfInput}
              value={description}
              onChange={handleInputChange}
            />
          </div>

          <PrimaryButton type='submit' className='rounded-none my-5'>
            UPDATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};

export default EditProduct;
