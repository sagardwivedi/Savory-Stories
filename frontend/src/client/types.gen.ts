// This file is auto-generated by @hey-api/openapi-ts

export type Body_auth_login_access_token = {
  grant_type?: string | null;
  username: string;
  password: string;
  scope?: string;
  client_id?: string | null;
  client_secret?: string | null;
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type Token = {
  access_token: string;
  token_type?: string;
};

export type UserCreate = {
  email: string;
  username: string;
  password: string;
};

export type UserPublic = {
  email: string;
  username: string;
  id: number;
};

export type UserUpdateMe = {
  email?: string | null;
  username?: string | null;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};

export type RegisterUserData = {
  body: UserCreate;
};

export type RegisterUserResponse = UserPublic;

export type RegisterUserError = HTTPValidationError;

export type LoginAccessTokenData = {
  body: Body_auth_login_access_token;
};

export type LoginAccessTokenResponse = Token;

export type LoginAccessTokenError = HTTPValidationError;

export type ReadUserResponse = UserPublic;

export type ReadUserError = unknown;

export type UpdateUserMeData = {
  body: UserUpdateMe;
};

export type UpdateUserMeResponse = UserPublic;

export type UpdateUserMeError = HTTPValidationError;

export type $OpenApiTs = {
  "/api/v1/auth/register": {
    post: {
      req: RegisterUserData;
      res: {
        /**
         * The Register user
         */
        "201": UserPublic;
        /**
         * Validation Error
         */
        "422": HTTPValidationError;
      };
    };
  };
  "/api/v1/auth/login/access-token": {
    post: {
      req: LoginAccessTokenData;
      res: {
        /**
         * Successful Response
         */
        "200": Token;
        /**
         * Validation Error
         */
        "422": HTTPValidationError;
      };
    };
  };
  "/api/v1/users/me": {
    get: {
      res: {
        /**
         * Successful Response
         */
        "200": UserPublic;
      };
    };
    patch: {
      req: UpdateUserMeData;
      res: {
        /**
         * Successful Response
         */
        "200": UserPublic;
        /**
         * Validation Error
         */
        "422": HTTPValidationError;
      };
    };
  };
};
