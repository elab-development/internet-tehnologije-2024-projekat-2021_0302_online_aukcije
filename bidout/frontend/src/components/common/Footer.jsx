import { Link, useLocation } from 'react-router-dom';
import { FiPhoneOutgoing } from 'react-icons/fi';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';

import HeaderLogo from '../../assets/header-logo.png';
import { Container, PrimaryButton, Title } from './Design';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <footer className=' relative bg-primary py-16 mt-16'>
        {isHomePage && (
          <div className='bg-white w-full py-20 -mt-10 rounded-b-[40px] z-10 absolute top-0'></div>
        )}

        <Container
          className={`${
            isHomePage ? 'mt-32' : 'mt-0'
          } flex flex-col md:flex-row justify-between gap-12`}
        >
          <div className='w-full md:w-1/3'>
            <img src={HeaderLogo} alt='logo' />

            <div className='bg-gray-300 h-[1px] my-8'></div>
            <Title level={6} className=' font-normal text-gray-100'>
              Get The Latest Updates
            </Title>
            <div className='flex items-center justify-between mt-5'>
              <input
                type='text'
                placeholder='Enter your email'
                className='w-full h-full p-3.5 py-[15px] text-sm border-none outline-none rounded-l-md'
              />
              <PrimaryButton className='rounded-none py-3.5 px-8 text-sm hover:bg-indigo-800 rounded-r-md'>
                Submit
              </PrimaryButton>
            </div>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-2/3'>
            <div>
              <Title level={5} className='text-white font-normal'>
                Explore
              </Title>
              <ul className='flex flex-col gap-5 mt-8 text-gray-200'>
                <Link to='/products'>
                  <p>Products</p>
                </Link>
                <Link to='/products?category=art'>
                  <p>Art</p>
                </Link>
                <Link to='/products?category=vehicles'>
                  <p>Vehicles</p>
                </Link>
              </ul>
            </div>
            <div>
              <Title level={5} className='text-white font-normal'>
                About
              </Title>
              <ul className='flex flex-col gap-5 mt-8 text-gray-200'>
                <p>About</p>
                <p>Help</p>
                <p>Terms</p>
              </ul>
            </div>
            <div>
              <Title level={5} className='text-white font-normal'>
                Help
              </Title>
              <ul className='flex flex-col gap-5 mt-8 text-gray-200'>
                <p>Account</p>
                <p>Shipping</p>
                <p>FAQ</p>
              </ul>
            </div>
            <div>
              <Title level={5} className='text-white font-normal'>
                Connect
              </Title>
              <ul className='flex flex-col gap-5 mt-8 text-gray-200'>
                <div className='flex items-center gap-2'>
                  <FiPhoneOutgoing size={19} />
                  <span>(381) 60-123-456</span>
                </div>
                <div className='flex items-center gap-2'>
                  <MdOutlineAttachEmail size={22} />
                  <span>help@bidout.com</span>
                </div>
                <div className='flex items-center gap-2'>
                  <IoLocationOutline size={22} />
                  <span>Address Line 1</span>
                </div>
              </ul>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
