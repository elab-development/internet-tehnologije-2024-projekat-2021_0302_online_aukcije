import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Caption,
  Container,
  CustomNavLink,
  PrimaryButton,
  Title,
  commonClassNameOfInput,
} from '../../components/common/Design';
import { login, RESET } from '../../redux/reducers/authSlice';
import { Loader } from '../../components/common/Loader';

const initialFormState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormState);
  const { email, password } = formData;

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

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return toast.error('Please fill out all the fields!');
    }

    const userData = {
      email: email.trim(),
      password: password.trim(),
    };

    dispatch(login(userData));

    if (success) {
      toast.success('Logged in successfully');
      navigate('/');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
    if (error) {
      toast.error(message || 'Login failed!');
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
                Login
              </Title>
              <div className='flex items-center gap-3'>
                <Title level={5} className='text-green font-normal text-xl'>
                  Home
                </Title>
                <Title level={5} className='text-white font-normal text-xl'>
                  /
                </Title>
                <Title level={5} className='text-white font-normal text-xl'>
                  Login
                </Title>
              </div>
            </div>
          </Container>
        </div>
        <form
          onSubmit={handleLogin}
          className='bg-white shadow-s3 w-full sm:w-1/2 m-auto my-16 p-8 rounded-xl'
        >
          <div className='text-center'>
            <Title level={5}>Login</Title>
            <p className='mt-2 text-lg'>
              {"Don't have an account? "}
              <CustomNavLink href='/register'>Sign up Here</CustomNavLink>
            </p>
          </div>

          <div className='py-5 mt-8'>
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
          <div>
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
          <PrimaryButton
            disabled={isLoading}
            className='w-full rounded-none my-5'
          >
            LOGIN
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};

export default Login;
