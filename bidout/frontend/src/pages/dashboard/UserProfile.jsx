import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getLoggedInUser,
  updateUserProfile,
} from '../../redux/reducers/authSlice';
import {
  Caption,
  commonClassNameOfInput,
  PrimaryButton,
  Title,
} from '../../components/common/Design';
import { Loader } from '../../components/common/Loader';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { loggedInUser, isLoading } = useSelector((state) => state.auth);

  const [name, setName] = useState(loggedInUser?.name || '');
  const [contactNumber, setContactNumber] = useState(
    loggedInUser?.contactNumber || ''
  );
  const [profileImage, setProfileImage] = useState(loggedInUser?.photo || '');
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handlePhotoUpload = (e) => {
    if (e.target?.files[0]) {
      setProfileImageFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target?.files[0]);
      setProfileImage(imageUrl);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', profileImageFile);
    formData.append('name', name);
    formData.append('contactNumber', contactNumber);
    dispatch(updateUserProfile(formData));
  };

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <section className='shadow-s1 p-8 rounded-lg'>
        <div className='profile flex items-center gap-8'>
          <label htmlFor='profileImage'>
            <img
              src={profileImage}
              alt='profile'
              className='w-24 h-24 rounded-full object-cover cursor-pointer'
            />
          </label>
          <input
            type='file'
            id='profileImage'
            name='profileImage'
            accept='image/*'
            onChange={handlePhotoUpload}
          />
          <div>
            <Title level={5} className='capitalize'>
              {loggedInUser?.name}
            </Title>
            <Caption>{loggedInUser?.email}</Caption>
          </div>
        </div>
        <form onSubmit={handleUpdateProfile}>
          <div className='flex items-center gap-5 mt-10'>
            <div className='w-full'>
              <Caption className='mb-2'>Full Name </Caption>
              <input
                type='text'
                className={`capitalize ${commonClassNameOfInput}`}
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className='flex items-center gap-5 mt-10'>
            <div className='w-1/2'>
              <Caption className='mb-2'>Contact Number</Caption>
              <input
                type='text'
                className={commonClassNameOfInput}
                placeholder='Contact Number'
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className='w-1/2'>
              <Caption className='mb-2'>Email</Caption>
              <input
                type='text'
                className={commonClassNameOfInput}
                placeholder='Email Address'
                value={loggedInUser?.email}
                disabled
              />
            </div>
          </div>
          <div className='my-8'>
            <Caption className='mb-2'>Role</Caption>
            <input
              type='text'
              className={commonClassNameOfInput}
              placeholder='User Role'
              value={loggedInUser?.role}
              disabled
            />
          </div>
          <PrimaryButton>Update Profile</PrimaryButton>
        </form>
      </section>
    </>
  );
};

export default UserProfile;
