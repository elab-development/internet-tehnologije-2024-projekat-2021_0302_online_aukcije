import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CiGrid41 } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineCategory } from 'react-icons/md';
import { RiAuctionLine } from 'react-icons/ri';
import { IoIosLogOut } from 'react-icons/io';
import { CgProductHunt } from 'react-icons/cg';
import { TbCurrencyDollar } from 'react-icons/tb';
import { FiUser } from 'react-icons/fi';
import { FaPlusCircle } from 'react-icons/fa';

import { logout, RESET } from '../../redux/reducers/authSlice';
import { Caption, CustomNavLink, Title } from '../common/Design';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(RESET());
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <section className='sidebar flex flex-col justify-between h-full'>
        <div className='profile flex items-center text-center justify-center gap-8 flex-col mb-8'>
          <img
            src={loggedInUser?.photo}
            alt='profile'
            className='w-32 h-32 rounded-full object-cover'
          />
          <div>
            <Title level={6} className='capitalize'>
              {loggedInUser?.name}
            </Title>
            <Caption>{loggedInUser?.email}</Caption>
          </div>
        </div>

        <div>
          <CustomNavLink
            href='/dashboard'
            isActive={location.pathname === '/dashboard'}
            className='flex items-center gap-3 mb-2 p-4 rounded-full'
          >
            <span>
              <CiGrid41 size={22} />
            </span>
            <span>Dashbaord</span>
          </CustomNavLink>

          {loggedInUser?.role === 'seller' && (
            <>
              <CustomNavLink
                href='/dashboard/products/my'
                isActive={location.pathname === '/dashboard/products/my'}
                className='flex items-center gap-3 mb-2 p-4 rounded-full'
              >
                <span>
                  <MdOutlineCategory size={22} />
                </span>
                <span>My Products</span>
              </CustomNavLink>
              <CustomNavLink
                href='/dashboard/products/create'
                isActive={location.pathname === '/dashboard/products/create'}
                className='flex items-center gap-3 mb-2 p-4 rounded-full'
              >
                <span>
                  <FaPlusCircle size={22} />
                </span>
                <span>Create Product</span>
              </CustomNavLink>
            </>
          )}

          {loggedInUser?.role === 'admin' && (
            <>
              <CustomNavLink
                href='/dashboard/admin/users'
                isActive={location.pathname === '/dashboard/admin/users'}
                className='flex items-center gap-3 mb-2 p-4 rounded-full'
              >
                <span>
                  <FiUser size={22} />
                </span>
                <span>Users</span>
              </CustomNavLink>

              <CustomNavLink
                href='/dashboard/admin/products'
                isActive={location.pathname === '/dashboard/admin/products'}
                className='flex items-center gap-3 mb-2 p-4 rounded-full'
              >
                <span>
                  <CgProductHunt size={22} />
                </span>
                <span>All Products</span>
              </CustomNavLink>

              <CustomNavLink
                href='/dashboard/admin/categories'
                isActive={location.pathname === '/dashboard/admin/categories'}
                className='flex items-center gap-3 mb-2 p-4 rounded-full'
              >
                <span>
                  <MdOutlineCategory size={22} />
                </span>
                <span>Categories</span>
              </CustomNavLink>
              <CustomNavLink
                href='/dashboard/admin/income'
                isActive={location.pathname === '/dashboard/admin/income'}
                className='flex items-center gap-3 mb-2 p-4 rounded-full'
              >
                <span>
                  <TbCurrencyDollar size={22} />
                </span>
                <span>Income</span>
              </CustomNavLink>
            </>
          )}

          {loggedInUser?.role === 'buyer' && (
            <CustomNavLink
              href='/dashboard/products/won'
              isActive={location.pathname === '/dashboard/products/won'}
              className='flex items-center gap-3 mb-2 p-4 rounded-full'
            >
              <span>
                <RiAuctionLine size={22} />
              </span>
              <span>Won Bids</span>
            </CustomNavLink>
          )}

          <CustomNavLink
            href='/dashboard/profile'
            isActive={location.pathname === '/dashboard/profile'}
            className='flex items-center gap-3 mb-2 p-4 rounded-full'
          >
            <span>
              <IoSettingsOutline size={22} />
            </span>
            <span>Personal Profile</span>
          </CustomNavLink>

          <button
            onClick={handleLogout}
            className='flex items-center w-full gap-3 mt-4 bg-red-500 mb-3 hover:text-white p-4 rounded-full text-white'
          >
            <span>
              <IoIosLogOut size={22} />
            </span>
            <span>Log Out</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
