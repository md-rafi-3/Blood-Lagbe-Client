import axios from 'axios';
import { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';

const baseURL = "http://localhost:3000";

const useAxiosSecure = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // memoized instance
  const axiosSecure = useMemo(() => axios.create({ baseURL }), []);

  useEffect(() => {
    if (!user?.accessToken) return;

    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;

        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          userSignOut()
            .then(() => navigate('/login'))
            .catch(() => {});
        }

        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken, userSignOut, navigate, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
