import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useRedirectNonAdminUser = (path) => {
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.auth);

  if (loggedInUser?.role !== 'admin') {
    navigate(path);
  }
};
