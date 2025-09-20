import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllCategories } from '../../redux/reducers/categorySlice';
import CategoryCard from '../cards/CategoryCard';
import { Container, Heading } from '../common/Design';

const CategorySlider = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <section className='category-slider pb-16'>
        <Container>
          <Heading
            title='Browse various categories'
            subtitle='Find your perfect domain for investment in digital assets'
          />
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 my-8'>
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default CategorySlider;
