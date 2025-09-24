import PropTypes from 'prop-types';

import { Title } from '../common/Design';

const AuctionHistory = ({ bids }) => {
  return (
    <>
      <div className='shadow-s1 p-8 rounded-lg'>
        <Title level={5} className=' font-normal'>
          Auction History
        </Title>
        <hr className='my-5' />

        <div className='relative overflow-x-auto rounded-lg'>
          {bids && bids.length > 0 ? (
            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                <tr>
                  <th scope='col' className='px-6 py-5'>
                    Date
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Bid Amount
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Bidder
                  </th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr
                    key={bid?._id}
                    className='bg-white border-b hover:bg-gray-50'
                  >
                    <td className='px-6 py-4'>
                      {new Date(bid?.updatedAt).toUTCString()}
                    </td>
                    <td className='px-6 py-4 font-semibold'>
                      ${bid?.price.toFixed(2)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2'>
                        <img
                          src={bid?.user?.photo}
                          className='w-10 h-10 rounded-full object-cover'
                        />
                        <span>{bid?.user?.name}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Title level={6}>No bids placed yet</Title>
          )}
        </div>
      </div>
    </>
  );
};

export default AuctionHistory;

AuctionHistory.propTypes = {
  bids: PropTypes.array,
};
