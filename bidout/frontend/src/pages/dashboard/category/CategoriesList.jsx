import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';

import { useRedirectNonAdminUser } from '../../../hooks/useRedirectNonAdminUser';
import {
  deleteCategory,
  getAllCategories,
} from '../../../redux/reducers/categorySlice';
import {
  PrimaryButton,
  ProfileCard,
  Title,
} from '../../../components/common/Design';
import { Loader } from '../../../components/common/Loader';

const CategoriesList = () => {
  useRedirectNonAdminUser('/dashboard');
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleDeleteCategory = async (id) => {
    try {
      await dispatch(deleteCategory(id));
      await dispatch(getAllCategories());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className='shadow-s1 p-8 rounded-lg'>
        <div className='flex justify-between'>
          <Title level={5} className=' font-normal'>
            Category List
          </Title>
          <NavLink to='/dashboard/admin/categories/create'>
            <PrimaryButton className='flex items-center gap-3 px-5 py-2 text-sm rounded-md transition-transform hover:scale-105'>
              <AiOutlinePlus size={20} />
              <span>Create Category</span>
            </PrimaryButton>
          </NavLink>
        </div>
        <hr className='my-5' />
        <div className='relative overflow-x-auto rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
              <tr>
                <th scope='col' className='px-6 py-5'>
                  #
                </th>
                <th scope='col' className='px-20 py-5'>
                  Created by
                </th>
                <th scope='col' className='px-6 py-5'>
                  Title
                </th>
                <th scope='col' className='px-6 py-5'>
                  Image
                </th>
                <th scope='col' className='px-6 py-5 flex justify-end'>
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <tr
                    key={category?._id}
                    className='bg-white border-b hover:bg-gray-50'
                  >
                    <td className='px-6 py-4'>{index + 1}</td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center px-6 text-gray-900 whitespace-nowrap'>
                        <div>
                          <ProfileCard>
                            <img
                              className='rounded-full w-full h-full object-cover'
                              src={category?.user?.photo}
                              alt={category?.user?.name}
                            />
                          </ProfileCard>
                        </div>
                        <div className='pl-3'>
                          <div className='text-base font-semibold capitalize'>
                            {' '}
                            {category?.user?.name}
                          </div>
                          <div className='font-normal text-gray-500'>
                            {' '}
                            {category?.user?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 capitalize'>{category?.title}</td>
                    <td className='px-6 py-4'>
                      <ProfileCard>
                        <img
                          className='w-full h-full'
                          src={category?.image}
                          alt={category?.title}
                        />
                      </ProfileCard>
                    </td>

                    <td className='px-6 py-4 text-center flex items-center justify-end gap-3 mt-1'>
                      <button
                        onClick={() => {
                          handleDeleteCategory(category?._id);
                        }}
                        className='font-medium text-red-500'
                      >
                        <MdOutlineDeleteOutline size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default CategoriesList;
