import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useRedirectNonAdminUser } from '../../../hooks/useRedirectNonAdminUser';
import { createCategory } from '../../../redux/reducers/categorySlice';
import {
  Caption,
  commonClassNameOfInput,
  PrimaryButton,
  Title,
} from '../../../components/common/Design';
import { Loader } from '../../../components/common/Loader';

const CreateCategory = () => {
  useRedirectNonAdminUser('/dashboard');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
  );
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, message } = useSelector((state) => state.category);
  const { loggedInUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    if (e.target?.files[0]) {
      setImageFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target?.files[0]);
      setImageUrl(imageUrl);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', title);
    formData.append('user', loggedInUser._id);
    dispatch(createCategory(formData));
  };

  useEffect(() => {
    if (message === 'success') {
      navigate('/dashboard/admin/categories');
    }
  }, [message, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className='bg-white shadow-s1 p-8 rounded-xl'>
        <Title level={5} className=' font-normal mb-5'>
          Create Category
        </Title>
        <form onSubmit={handleCreateCategory}>
          <div className='w-full my-8'>
            <Caption className='mb-2'>Title *</Caption>
            <input
              type='text'
              className={`${commonClassNameOfInput}`}
              placeholder='Enter Category Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Caption className='mt-8 mb-2'>Image *</Caption>
            <label htmlFor='categoryImage'>
              <img
                src={imageUrl}
                alt='placeholder'
                className='w-40 h-40 cursor-pointer rounded-md'
              />
            </label>
            <input
              type='file'
              id='categoryImage'
              name='categoryImage'
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

export default CreateCategory;
