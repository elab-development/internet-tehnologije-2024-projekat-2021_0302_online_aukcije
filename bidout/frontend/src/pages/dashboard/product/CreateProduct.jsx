import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRedirectNonSellerUser } from '../../../hooks/useRedirectNonSellerUser';
import { getAllCategories } from '../../../redux/reducers/categorySlice';
import { createProduct } from '../../../redux/reducers/productSlice';
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

const CreateProduct = () => {
  useRedirectNonSellerUser('/dashboard');
  const [productData, setProductData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
  );

  const {
    title,
    description,
    price,
    height,
    lengthPic,
    width,
    mediumUsed,
    weight,
    category,
  } = productData;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleChangeCategory = (e) => {
    if (e.target.value === 'all') {
      setProductData({ ...productData, category: categories[0]?._id });
    } else {
      setProductData({ ...productData, category: e.target.value });
    }
  };

  const handleImageUpload = (e) => {
    if (e.target?.files[0]) {
      setImageFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target?.files[0]);
      setImageUrl(imageUrl);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !category || !imageFile) {
      toast.error('Please fill out all the necessarry fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('lengthPic', lengthPic);
    formData.append('height', height);
    formData.append('width', width);
    formData.append('weight', weight);
    formData.append('mediumUsed', mediumUsed);
    formData.append('image', imageFile);
    formData.append('category', category);

    await dispatch(createProduct(formData));
    navigate('/dashboard/products/my');
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <section className='bg-white shadow-s1 p-8 rounded-xl'>
        <Title level={5} className=' font-normal mb-5'>
          Create Product
        </Title>
        <hr className='my-5' />
        <form onSubmit={handleCreateProduct}>
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
          <div className='py-5'>
            <Caption className='mb-2'>Category *</Caption>
            {categories && categories.length > 0 && (
              <select
                className={`${commonClassNameOfInput} capitalize`}
                onChange={handleChangeCategory}
              >
                <option value={'all'}>Select a Category</option>
                {categories.map((category) => (
                  <option
                    className='capitalize'
                    key={category?._id}
                    value={category?._id}
                  >
                    {category?.title}
                  </option>
                ))}
              </select>
            )}
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
          <div>
            <Caption className='mt-6 mb-2'>Image *</Caption>
            <label htmlFor='image'>
              <img
                src={imageUrl}
                alt='placeholder'
                className='w-40 h-40 cursor-pointer rounded-md'
              />
            </label>
            <input
              type='file'
              className={`${commonClassNameOfInput}`}
              id='image'
              name='image'
              accept='image/*'
              onChange={handleImageUpload}
            />
          </div>
          <PrimaryButton type='submit' className='rounded-none my-5'>
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};

export default CreateProduct;
