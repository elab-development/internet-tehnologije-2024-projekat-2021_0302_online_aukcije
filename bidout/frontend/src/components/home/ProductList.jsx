import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVerifiedProducts } from '../../redux/reducers/productSlice';
import { Container, Heading } from '../common/Design';
import ProductCard from '../cards/ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const { verifiedProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getVerifiedProducts());
  }, [dispatch]);

  return (
    <>
      <section className='product-home'>
        <Container>
          <Heading
            title='Live Auctions'
            subtitle='Explore most recently posted auctions'
          />
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8'>
            {verifiedProducts?.slice(0, 12)?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductList;
