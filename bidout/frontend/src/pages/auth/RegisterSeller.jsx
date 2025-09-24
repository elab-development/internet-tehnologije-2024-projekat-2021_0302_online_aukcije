import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Caption,
  commonClassNameOfInput,
  Container,
  CustomNavLink,
  PrimaryButton,
  Title,
} from '../../components/common/Design';
import { register, RESET } from '../../redux/reducers/authSlice';
import { Loader } from '../../components/common/Loader';

const initialFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterSeller = () => {
  const [formData, setFormData] = useState(initialFormState);
  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, success, isLoggedIn, error, message } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return toast.error('Please fill all the fields!');
    }

    if (password.trim().length < 8) {
      return toast.error('Password must be at least 8 characters long!');
    }

    if (password.trim() !== confirmPassword.trim()) {
      return toast.error('Passwords do not match!');
    }

    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      role: 'seller',
    };

    dispatch(register(userData));

    if (success) {
      toast.success('Registered successfully');
      navigate('/');
    }
  };

  useEffect(() => {
    if (success && isLoggedIn) {
      navigate('/');
    }
    if (error) {
      toast.error(message || 'Registration failed!');
    }
    return () => {
      dispatch(RESET());
    };
  }, [dispatch, success, isLoggedIn, error, message, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className='register pt-16 relative'>
        <div className='bg-[#241C37] pt-8 h-[40vh] relative content'>
          <Container>
            <div>
              <Title level={3} className='text-white'>
                Sign Up As Seller
              </Title>
              <div className='flex items-center gap-3'>
                <Title level={5} className='text-green font-normal text-xl'>
                  Home
                </Title>
                <Title level={5} className='text-white font-normal text-xl'>
                  /
                </Title>
                <Title level={5} className='text-white font-normal text-xl'>
                  Sign Up As Seller
                </Title>
              </div>
            </div>
          </Container>
        </div>
        <form
          onSubmit={handleRegister}
          className='bg-white shadow-s3 w-full sm:w-1/2 m-auto my-16 p-8 rounded-xl'
        >
          <div className='text-center'>
            <Title level={5}>Create a Seller Account</Title>
            <p className='mt-2 mb-4 text-lg'>
              Already have an account?{' '}
              <CustomNavLink href='/login'>Log In Here</CustomNavLink>
            </p>
          </div>
          <div className='pb-5'>
            <Caption className='mb-2'>Name *</Caption>
            <input
              type='text'
              name='name'
              className={commonClassNameOfInput}
              placeholder='Enter Your Name'
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className='pb-5'>
            <Caption className='mb-2'>Email Address *</Caption>
            <input
              type='email'
              name='email'
              className={commonClassNameOfInput}
              placeholder='Enter Your Email'
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className='pb-5'>
            <Caption className='mb-2'>Password *</Caption>
            <input
              type='password'
              name='password'
              className={commonClassNameOfInput}
              placeholder='Enter Your Password'
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className='pb-2'>
            <Caption className='mb-2'>Confirm Password *</Caption>
            <input
              type='password'
              name='confirmPassword'
              className={commonClassNameOfInput}
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <PrimaryButton
            disabled={isLoading}
            className='w-full rounded-none my-5'
          >
            {isLoading ? 'Loading...' : 'CREATE ACCOUNT'}
          </PrimaryButton>
          <p className='text-center mt-5'>
            By clicking the signup button, you create a BidOut account, and you
            agree to BidOuts{' '}
            <span className='text-green underline'>Terms & Conditions</span> &
            <span className='text-green underline'> Privacy Policy </span> .
          </p>
        </form>
      </section>
    </>
  );
};

export default RegisterSeller;
