import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';

import HeroImg from '../../assets/hero.webp';
import User1Img from '../../assets/users/user1.jpg';
import User2Img from '../../assets/users/user2.jpg';
import User3Img from '../../assets/users/user3.jpg';
import User4Img from '../../assets/users/user4.png';
import { Body, Container, ProfileCard, Title } from '../common/Design';
import SearchBox from './SearchBox';
import Box from './Box';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className='hero bg-primary py-8'>
        <Container className='flex items-center justify-between md:flex-row flex-col'>
          <div className='w-full md:w-1/2 text-white pr-12 mt-16'>
            <Title level={3} className='text-white'>
              Build, sell & collect digital assets
            </Title>
            <Body className='leading-7 text-gray-200 my-8'>
              Step into the future of creativity and commerce. Showcase your
              unique digital creations, connect with passionate collectors, and
              explore an ever-growing marketplace for extraordinary assets.
              Start building, selling, and collecting today.
            </Body>
            <SearchBox />

            <div className='flex items-center gap-8 my-8'>
              <div>
                <Title level={4} className='text-white'>
                  842M
                </Title>
                <Body className='leading-7 text-gray-200'>Total Biddings</Body>
              </div>
              <div>
                <Title level={4} className='text-white'>
                  82M
                </Title>
                <Body className='leading-7 text-gray-200'>Total Products</Body>
              </div>
              <div>
                <Title level={4} className='text-white'>
                  54
                </Title>
                <Body className='leading-7 text-gray-200'>
                  Total Categories
                </Body>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/2 my-16 relative py-16'>
            <img src={HeroImg} alt='hero' />
            <div className='horiz-move absolute md:top-28 top-8 left-0'>
              <Box title='Proof of quality' desc='ISO/IEC 25010:2023' />
            </div>
            <div className='horiz-move absolute bottom-72 right-0'>
              <Box title='Safe and secure' desc='ISO/IEC 27001:2022' />
            </div>

            <div className='px-5 py-4 bg-white shadow-md flex items-center gap-5 rounded-xl ml-5 -mt-5 vert-move w-1/2'>
              <Title level={6}>56M Happy Clients</Title>
              <div className='flex items-center'>
                <ProfileCard className='border-2 border-white'>
                  <img
                    src={User1Img}
                    alt='user1'
                    className='w-full h-full object-cover rounded-full'
                  />
                </ProfileCard>
                <ProfileCard className='border-2 border-white -ml-4'>
                  <img
                    src={User2Img}
                    alt='user2'
                    className='w-full h-full object-cover rounded-full'
                  />
                </ProfileCard>
                <ProfileCard className='border-2 border-white -ml-4'>
                  <img
                    src={User3Img}
                    alt='user3'
                    className='w-full h-full object-cover rounded-full'
                  />
                </ProfileCard>
                <ProfileCard className='border-2 border-white -ml-4'>
                  <img
                    src={User4Img}
                    alt='user4'
                    className='w-full h-full object-cover rounded-full'
                  />
                </ProfileCard>
                <div
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  <ProfileCard className='border-2 border-white -ml-4 cursor-pointer'>
                    <CiCirclePlus size={27} />
                  </ProfileCard>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <div className='bg-white w-full py-16 -mt-10 rounded-t-[40px]'></div>
    </>
  );
};

export default Hero;
