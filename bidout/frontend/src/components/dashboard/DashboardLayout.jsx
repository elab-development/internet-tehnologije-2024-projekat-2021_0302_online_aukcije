import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { useRedirectLoggedOutUser } from '../../hooks/useRedirectLoggedOutUser.hook';
import Sidebar from './Sidebar';
import { Container } from '../common/Design';
import { getLoggedInUser } from '../../redux/reducers/authSlice';

const DashboardLayout = ({ children }) => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  return (
    <>
      <div className='mt-32'>
        <Container className='flex flex-col lg:flex-row'>
          <div
            className={`${
              loggedInUser?.role === 'admin'
                ? 'h-[92vh]'
                : loggedInUser?.role === 'seller'
                ? 'h-[76vh]'
                : 'h-[70vh]'
            } w-[100%] lg:w-[25%] shadow-s1 py-8 p-5 rounded-lg`}
          >
            <Sidebar role={loggedInUser?.role} />
          </div>
          <div className='w-[100%] lg:w-[75%] px-5 mt-10 lg:mt-0 lg:ml-10 rounded-lg'>
            {children}
          </div>
        </Container>
      </div>
    </>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.any,
};
