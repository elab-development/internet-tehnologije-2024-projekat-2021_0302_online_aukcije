import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import { getLoginStatus } from './redux/reducers/authSlice';
import Layout from './components/common/Layout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import RegisterSeller from './pages/auth/RegisterSeller';
import Dashboard from './pages/dashboard/Dashboard';
import UserProfile from './pages/dashboard/UserProfile';
import Income from './pages/dashboard/admin/Income';
import UsersList from './pages/dashboard/admin/UsersList';
import CategoriesList from './pages/dashboard/category/CategoriesList';
import CreateCategory from './pages/dashboard/category/CreateCategory';
import AllProductsList from './pages/dashboard/product/AllProductsList';
import VerifyProduct from './pages/dashboard/product/VerifyProduct';
import CreateProduct from './pages/dashboard/product/CreateProduct';
import EditProduct from './pages/dashboard/product/EditProduct';
import MyProducts from './pages/dashboard/product/MyProducts';
import MyWonProducts from './pages/dashboard/product/MyWonProducts';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path='/register'
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          <Route
            path='/login'
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />

          <Route
            path='/seller/register'
            element={
              <Layout>
                <RegisterSeller />
              </Layout>
            }
          />

          <Route
            path='/products'
            element={
              <Layout>
                <Products />
              </Layout>
            }
          />

          <Route
            path='/products/:id'
            element={
              <Layout>
                <ProductDetails />
              </Layout>
            }
          />

          <Route
            path='/dashboard'
            element={
              <Layout>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/profile'
            element={
              <Layout>
                <DashboardLayout>
                  <UserProfile />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/admin/income'
            element={
              <Layout>
                <DashboardLayout>
                  <Income />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/admin/users'
            element={
              <Layout>
                <DashboardLayout>
                  <UsersList />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/admin/categories'
            element={
              <Layout>
                <DashboardLayout>
                  <CategoriesList />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/admin/categories/create'
            element={
              <Layout>
                <DashboardLayout>
                  <CreateCategory />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/admin/products'
            element={
              <Layout>
                <DashboardLayout>
                  <AllProductsList />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/admin/products/verify/:id'
            element={
              <Layout>
                <DashboardLayout>
                  <VerifyProduct />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/products/create'
            element={
              <Layout>
                <DashboardLayout>
                  <CreateProduct />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/products/update/:id'
            element={
              <Layout>
                <DashboardLayout>
                  <EditProduct />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/products/my'
            element={
              <Layout>
                <DashboardLayout>
                  <MyProducts />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route
            path='/dashboard/products/won'
            element={
              <Layout>
                <DashboardLayout>
                  <MyWonProducts />
                </DashboardLayout>
              </Layout>
            }
          />

          <Route path='*' element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
