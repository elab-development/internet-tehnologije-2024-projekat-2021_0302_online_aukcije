import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../redux/services/authServices';

export const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn;

    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus();
      } catch (error) {
        console.log(error);
      }

      if (!isLoggedIn) {
        navigate(path);
        return;
      }
    };

    redirectLoggedOutUser();
  }, [path, navigate]);
};
