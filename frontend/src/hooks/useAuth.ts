import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import {
  type Body_auth_login_access_token as AccessToken,
  type ApiError,
  type UserCreate,
  type UserRead,
  loginAccessToken,
  readUser,
  registerUser,
} from '@/client';
import useCustomToast from './useCustomToast';

const isLoggedIn = () => {
  return localStorage.getItem('access_token') !== null;
};

const useAuth = () => {
  const navigate = useNavigate();
  const showToast = useCustomToast();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery<UserRead | null, Error>({
    queryKey: ['currentUser'],
    queryFn: readUser,
    enabled: isLoggedIn(),
  });

  const signUpMutation = useMutation({
    mutationFn: (data: UserCreate) => registerUser({ requestBody: data }),

    onSuccess: () => {
      navigate({ to: '/auth/login' });
      showToast('Success!', 'User created successfully.', 'success');
    },
    onError: (err: ApiError) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      let errDetail = (err.body as any)?.detail;

      if (err instanceof AxiosError) {
        errDetail = err.message;
      }

      showToast('Something went wrong.', `${errDetail}`, 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const login = async (data: AccessToken) => {
    const response = await loginAccessToken({
      formData: data,
    });
    localStorage.setItem('access_token', response.access_token);
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onError: (err: ApiError) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      let errDetail = (err.body as any)?.detail;

      if (err instanceof AxiosError) {
        errDetail = err.message;
      }

      if (Array.isArray(errDetail)) {
        errDetail = 'Something went wrong';
      }

      showToast('Something went wrong.', `${errDetail}`, 'error');
    },
  });

  const logout = () => {
    localStorage.removeItem('access_token');
    navigate({ to: '/auth/login' });
  };

  return {
    signUpMutation,
    loginMutation,
    logout,
    user,
    isLoading,
  };
};

export { isLoggedIn };
export default useAuth;
