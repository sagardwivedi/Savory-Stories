import {
  loginAccessToken,
  type Body_auth_login_access_token as AccessToken,
} from '../client';

const useAuth = () => {
  const login = async (data: AccessToken) => {
    const response = await loginAccessToken({
      body: data,
    });
  };
};
