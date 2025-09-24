const NotFound = () => {
  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-gray-800 mt-4'>404</h1>
          <p className='text-lg text-gray-600 mt-2'>Page Not Found</p>
          <a
            href='/'
            className='mt-4 inline-block px-4 py-2 bg-green text-white rounded hover:bg-green transition duration-300'
          >
            Go Back Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
