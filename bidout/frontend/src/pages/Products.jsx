import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineCategory } from 'react-icons/md';
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';

import {
  getAllProducts,
  getFilteredProducts,
} from '../redux/reducers/productSlice';
import { getAllCategories } from '../redux/reducers/categorySlice';
import { createArray, makeQuery } from '../utils/helpers';
import { Container, Heading } from '../components/common/Design';
import { Loader } from '../components/common/Loader';
import ProductCard from '../components/cards/ProductCard';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';

  const [chosenCategory, setChosenCategory] = useState(category || '');
  const [chosenSort, setChosenSort] = useState(sort || 'price-min-to-max');

  useEffect(() => {
    if (query || category || sort) {
      const queryParams = makeQuery(query, category, sort);
      dispatch(getFilteredProducts(queryParams));
    } else {
      dispatch(getAllProducts());
    }
    dispatch(getAllCategories());
  }, [dispatch, query, category, sort]);

  useEffect(() => {
    setTotalPages(Math.ceil(products?.length / 12));
    setCurrentPage(1);
  }, [products]);

  useEffect(() => {
    const queryParams = makeQuery(query, chosenCategory, chosenSort);
    dispatch(getFilteredProducts(queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenCategory, chosenSort]);

  return (
    <>
      {isLoading && <Loader />}
      <Container className='mt-24'>
        <div className='flex flex-row flex-wrap items-center'>
          <div className='flex-1'>
            <Heading
              title='Auctions'
              subtitle='Explore most recently posted auctions'
            />
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 shadow-s2 border border-gray-300 text-gray-700 px-4 py-2 rounded-md'>
              <MdOutlineCategory size={22} />
              <select
                onChange={(e) => setChosenCategory(e.target.value)}
                className='capitalize cursor-pointer w-36'
                defaultValue={chosenCategory}
              >
                {!chosenCategory && (
                  <option value={'all'}>Filter Categories</option>
                )}
                {categories.map((dbCat) => (
                  <option
                    className='capitalize'
                    key={dbCat?._id}
                    value={dbCat?.title}
                  >
                    {dbCat?.title}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex items-center gap-2 shadow-s2 border border-gray-300 text-gray-700 px-4 py-2 rounded-md'>
              {chosenSort === 'price-min-to-max' ? (
                <FaSortAmountDownAlt size={22} />
              ) : (
                <FaSortAmountDown size={22} />
              )}
              <select
                onChange={(e) => setChosenSort(e.target.value)}
                className='capitalize cursor-pointer w-32'
                defaultValue={chosenSort}
              >
                <option className='capitalize' value='price-min-to-max'>
                  Low to High
                </option>
                <option className='capitalize' value='price-max-to-min'>
                  High to Low
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8'>
          {products
            .slice(currentPage * 12 - 12, currentPage * 12)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>

        {totalPages > 0 && (
          <div className='flex flex-row items-center justify-center gap-1 w-full'>
            {createArray(totalPages).map((page) => (
              <div
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center cursor-pointer w-8 h-8 text-sm font-semibold border rounded-lg
                      ${
                        currentPage === page
                          ? 'text-white bg-primary border-none'
                          : 'text-primary bg-transparent'
                      }
                    `}
              >
                {page}
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Products;
