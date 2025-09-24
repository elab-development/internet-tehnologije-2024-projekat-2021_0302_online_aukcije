import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useRedirectNonBuyerUser = (path) => {
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.auth);

  if (loggedInUser?.role !== 'buyer') {
    navigate(path);
  }
};
