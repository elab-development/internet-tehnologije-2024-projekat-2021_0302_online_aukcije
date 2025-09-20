import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';

import { PrimaryButton } from '../common/Design';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      return;
    } else {
      navigate(`/products?q=${query}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor='search'
          className='mb-2 text-sm font-medium text-gray-800 sr-only'
        >
          Search
        </label>
        <div className='relative'>
          <input
            type='text'
            className='block shadow-md w-full p-6 lg:ps-16 text-sm text-gray-800 rounded-full bg-gray-50 outline-none'
            placeholder='Search products...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <PrimaryButton className='absolute end-2.5 bottom-2'>
            <IoSearchOutline color='white' size={25} />
          </PrimaryButton>
        </div>
      </form>
    </>
  );
};

export default SearchBox;
