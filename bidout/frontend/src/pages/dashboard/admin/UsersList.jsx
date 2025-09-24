import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRedirectNonAdminUser } from '../../../hooks/useRedirectNonAdminUser';
import { getAllUsers } from '../../../redux/reducers/authSlice';
import { ProfileCard, Title } from '../../../components/common/Design';

const UsersList = () => {
  useRedirectNonAdminUser('/dashboard');
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <section className='shadow-s1 p-8 rounded-lg'>
        <div className='flex justify-between'>
          <Title level={5} className='font-normal'>
            Users
          </Title>
        </div>
        <hr className='my-5' />
        <div className='relative overflow-x-auto rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
              <tr>
                <th scope='col' className='px-6 py-5'>
                  #
                </th>
                <th scope='col' className='px-6 py-5'>
                  Name
                </th>
                <th scope='col' className='px-6 py-5'>
                  Email
                </th>
                <th scope='col' className='px-6 py-5'>
                  Role
                </th>
                <th scope='col' className='px-6 py-5'>
                  Photo
                </th>
                <th scope='col' className='px-6 py-3'>
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user, index) => (
                  <tr
                    key={index}
                    className='bg-white border-b hover:bg-gray-50'
                  >
                    <td className='px-6 py-4'>{index + 1}</td>
                    <td className='px-6 py-4 capitalize'>{user?.name}</td>
                    <td className='px-6 py-4'>{user?.email}</td>
                    <td className='px-6 py-4 capitalize'>{user?.role}</td>
                    <td className='px-6 py-4'>
                      <ProfileCard>
                        <img
                          className='w-full h-full object-cover rounded-full'
                          src={user?.photo}
                          alt={user?.name}
                        />
                      </ProfileCard>
                    </td>
                    <td className='px-6 py-4'>
                      {new Date(user?.createdAt).toDateString()}
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

export default UsersList;
