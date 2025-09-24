import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useRedirectNonAdminOrSellerUser = (path) => {
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.auth);

  if (loggedInUser?.role !== 'admin' && loggedInUser?.role !== 'seller') {
    navigate(path);
  }
};
