import PropTypes from 'prop-types';
import { AiOutlinePropertySafety } from 'react-icons/ai';

import { Caption, Title } from '../common/Design';

const Box = ({ title, desc }) => {
  return (
    <>
      <div className='px-5 py-4 bg-white shadow-md flex items-center gap-5 rounded-xl w-auto'>
        <div className='w-14 h-14 bg-green_100 flex items-center justify-center rounded-full'>
          <AiOutlinePropertySafety size={27} className='text-primary' />
        </div>
        <div>
          <Title level={6}>{title}</Title>
          <Caption>{desc}</Caption>
        </div>
      </div>
    </>
  );
};

export default Box;

Box.propTypes = {
  title: PropTypes.any,
  desc: PropTypes.any,
};
