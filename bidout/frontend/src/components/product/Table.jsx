import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';

import { Title } from '../common/Design';
import BidsCell from './BidsCell';
import SellBid from './SellBid';

const Table = ({ products, isAdmin, handleDeleteProduct }) => {
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
                {isAdmin && (
                  <th scope='col' className='px-6 py-5'>
                    Posted By
                  </th>
                )}
                <th scope='col' className='px-6 py-3'>
                  Commission
                </th>
                <th scope='col' className='px-6 py-3'>
                  Original Price
                </th>
                <th scope='col' className='px-6 py-3'>
                  Current Bid
                </th>
                <th scope='col' className='px-6 py-3'>
                  Image
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Actions
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
                  {isAdmin && (
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-4'>
                        <img
                          src={product?.user?.photo}
                          alt={product?.user?.name}
                          className='w-10 h-10 rounded-full object-cover'
                        />
                        <div className='flex flex-col'>
                          <span>{product?.user?.name}</span>
                          <span>{product?.user?.email}</span>
                        </div>
                      </div>
                    </td>
                  )}
                  <td className='px-6 py-4'>{product?.commission}%</td>
                  <td className='px-6 py-4'>${product?.price?.toFixed(2)}</td>
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
                  <td className='px-6 py-4'>
                    <div className='flex items-center'>
                      {product?.isVerified ? (
                        product?.isSoldout ? (
                          <>
                            <div className='h-2.5 w-2.5 rounded-full bg-primary me-2'></div>{' '}
                            Sold
                          </>
                        ) : (
                          <>
                            <div className='h-2.5 w-2.5 rounded-full bg-green me-2'></div>{' '}
                            Active
                          </>
                        )
                      ) : (
                        <>
                          <div className='h-2.5 w-2.5 rounded-full bg-red-500 me-2'></div>{' '}
                          Unverified
                        </>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-center flex items-center justify-end gap-3 mt-1'>
                    {product?.isVerified && !product?.isSoldout && !isAdmin && (
                      <SellBid productId={product?._id} />
                    )}
                    {!product?.isVerified && (
                      <>
                        {isAdmin ? (
                          !product?.isVerified && (
                            <NavLink
                              to={`/dashboard/admin/products/verify/${product?._id}`}
                              type='button'
                              className='font-medium text-green'
                            >
                              <CiEdit size={25} />
                            </NavLink>
                          )
                        ) : (
                          <NavLink
                            to={`/dashboard/products/update/${product?._id}`}
                            type='button'
                            className='font-medium text-green'
                          >
                            <CiEdit size={25} />
                          </NavLink>
                        )}

                        <button
                          onClick={() => handleDeleteProduct(product?._id)}
                          className='font-medium text-red-500'
                        >
                          <MdOutlineDeleteOutline size={25} />
                        </button>
                      </>
                    )}
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

export default Table;

Table.propTypes = {
  products: PropTypes.array,
  isAdmin: PropTypes.bool,
  handleDeleteProduct: PropTypes.any,
};
