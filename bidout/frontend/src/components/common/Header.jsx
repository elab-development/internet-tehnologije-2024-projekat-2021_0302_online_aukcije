import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import HeaderLogo from '../../assets/header-logo.png';
import HeaderLogo2 from '../../assets/header-logo2.png';
import { menuLists } from '../../utils/data';
import { logout } from '../../redux/reducers/authSlice';
import {
  Container,
  CustomNavLink,
  CustomNavLinkList,
  ProfileCard,
} from './Design';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();
  const { loggedInUser, isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenuOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/seller/register');
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenuOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', closeMenuOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header
        className={
          isHomePage
            ? `header py-1 bg-primary ${isScrolled ? 'scrolled' : ''}`
            : `header bg-white shadow-s1 ${isScrolled ? 'scrolled' : ''}`
        }
      >
        <Container>
          <nav className='p-4 flex justify-between items-center relative'>
            <div className='flex items-center gap-14'>
              <div>
                {isHomePage && !isScrolled ? (
                  <Link to='/'>
                    <img src={HeaderLogo} alt='logo' className='h-11' />
                  </Link>
                ) : (
                  <Link to='/'>
                    <img src={HeaderLogo2} alt='logo' className='h-11' />
                  </Link>
                )}
              </div>
              <div className='hidden lg:flex items-center justify-between gap-8'>
                {menuLists.map((list) => (
                  <li key={list.id} className='capitalize list-none'>
                    <CustomNavLinkList
                      href={list.path}
                      isActive={location.pathname === list.path}
                      className={`${
                        isScrolled || !isHomePage ? 'text-black' : 'text-white'
                      }`}
                    >
                      {list.link}
                    </CustomNavLinkList>
                  </li>
                ))}
              </div>
            </div>
            <div className='flex items-center gap-8 icons'>
              <div className='hidden lg:flex lg:items-center lg:gap-8'>
                <IoSearchOutline
                  onClick={() => navigate('/products')}
                  size={23}
                  className={`${
                    isScrolled || !isHomePage ? 'text-black' : 'text-white'
                  }`}
                />

                {isLoggedIn && loggedInUser?.role === 'buyer' && (
                  <div
                    onClick={handleLogout}
                    className={`${
                      isScrolled || !isHomePage ? 'text-black' : 'text-white'
                    } text-[17px] font-medium cursor-pointer list-none hover:text-green transition-all ease-in-out`}
                  >
                    Become a Seller
                  </div>
                )}

                {!isLoggedIn && (
                  <CustomNavLink
                    href='/login'
                    className={`${
                      isScrolled || !isHomePage ? 'text-black' : 'text-white'
                    }`}
                  >
                    Sign in
                  </CustomNavLink>
                )}

                {!isLoggedIn && (
                  <CustomNavLink
                    href='/register'
                    className={`${
                      !isHomePage || isScrolled ? 'bg-green' : 'bg-white'
                    } px-8 py-2 rounded-full text-primary shadow-md`}
                  >
                    Join
                  </CustomNavLink>
                )}

                {isLoggedIn && (
                  <CustomNavLink href='/dashboard'>
                    <ProfileCard>
                      <img
                        src={loggedInUser?.photo}
                        alt=''
                        className='w-full h-full object-cover rounded-full'
                      />
                    </ProfileCard>
                  </CustomNavLink>
                )}
              </div>
              <div
                className={`icon flex items-center justify-center gap-6 ${
                  isScrolled || !isHomePage ? 'text-primary' : 'text-white'
                }`}
              >
                <button
                  onClick={toggleMenu}
                  className='lg:hidden w-10 h-10 flex justify-center items-center bg-black text-white focus:outline-none'
                >
                  {isOpen ? (
                    <AiOutlineClose size={24} />
                  ) : (
                    <AiOutlineMenu size={24} />
                  )}
                </button>
              </div>
            </div>

            {/* Responsive Menu if below 768px */}
            <div
              ref={menuRef}
              className={`lg:flex lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${
                isOpen ? 'open' : 'closed'
              }`}
            >
              {menuLists.map((list) => (
                <li key={list.id} className='uppercase list-none'>
                  <CustomNavLink href={list.path} className='text-white'>
                    {list.link}
                  </CustomNavLink>
                </li>
              ))}
              {!isLoggedIn && (
                <>
                  <li className='uppercase list-none'>
                    <CustomNavLink href='/login' className='text-white'>
                      Login
                    </CustomNavLink>
                  </li>
                  <li className='uppercase list-none'>
                    <CustomNavLink href='/register' className='text-white'>
                      Register
                    </CustomNavLink>
                  </li>
                </>
              )}
              {isLoggedIn && loggedInUser?.role === 'buyer' && (
                <li className='uppercase list-none'>
                  <CustomNavLink href='/seller/register' className='text-white'>
                    Become a Seller
                  </CustomNavLink>
                </li>
              )}
              {isLoggedIn && (
                <li className='uppercase list-none'>
                  <CustomNavLink href='/dashboard' className='text-white'>
                    Profile
                  </CustomNavLink>
                </li>
              )}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Header;
