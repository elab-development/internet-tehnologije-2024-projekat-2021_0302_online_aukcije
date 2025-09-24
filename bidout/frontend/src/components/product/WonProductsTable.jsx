import PropTypes from 'prop-types';
import BidsCell from './BidsCell';
import { Title } from '../common/Design';
import { Link } from 'react-router-dom';

const WonProductsTable = ({ products }) => {
  return (
    <>
      <div className='relative overflow-x-auto rounded-lg'>
        {products?.length > 0 ? (
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
              <tr>
                <th scope='col' className='px-6 py-5'>
                  Title
                </th>
                <th scope='col' className='px-6 py-3'>
                  Original Price
                </th>
                <th scope='col' className='px-6 py-3'>
                  Your Bid
                </th>
                <th scope='col' className='px-6 py-3'>
                  Image
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product?._id}
                  className='bg-white border-b hover:bg-gray-50'
                >
                  <td className='px-6 py-4 font-semibold'>
                    <Link to={`/products/${product?._id}`}>
                      {product?.title}
                    </Link>
                  </td>
                  <td className='px-6 py-4'>${product?.price}</td>
                  <td className='px-4 py-4'>
                    <BidsCell productId={product?._id} />
                  </td>
                  <td className='px-6 py-4'>
                    <Link to={`/products/${product?._id}`}>
                      <img
                        className='w-10 h-10 rounded-md'
                        src={product?.image?.filePath}
                        alt={product?.title}
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Title level={6}>No products found...</Title>
        )}
      </div>
    </>
  );
};

export default WonProductsTable;

WonProductsTable.propTypes = {
  products: PropTypes.array,
};
