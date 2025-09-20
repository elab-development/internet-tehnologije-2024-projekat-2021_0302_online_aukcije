import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Title } from '../common/Design';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products?category=${category.title}`)}
      className='cursor-pointer flex items-center flex-col gap-2 py-8 rounded-lg bg-green_100 shadow-s1'
    >
      <div className='h-24'>
        <img
          src={category.image}
          alt=''
          className='w-full h-full object-contain'
        />
      </div>
      <Title level={6} className='uppercase'>
        {category.title}
      </Title>
    </div>
  );
};

export default CategoryCard;

CategoryCard.propTypes = {
  category: PropTypes.object,
};
