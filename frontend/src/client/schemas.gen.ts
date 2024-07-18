// This file is auto-generated by @hey-api/openapi-ts

export const $Body_auth_login_access_token = {
  properties: {
    grant_type: {
      anyOf: [
        {
          type: 'string',
          pattern: 'password',
        },
        {
          type: 'null',
        },
      ],
      title: 'Grant Type',
    },
    username: {
      type: 'string',
      title: 'Username',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
    scope: {
      type: 'string',
      title: 'Scope',
      default: '',
    },
    client_id: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Client Id',
    },
    client_secret: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
      title: 'Client Secret',
    },
  },
  type: 'object',
  required: ['username', 'password'],
  title: 'Body_auth-login_access_token',
} as const;

export const $HTTPValidationError = {
  properties: {
    detail: {
      items: {
        $ref: '#/components/schemas/ValidationError',
      },
      type: 'array',
      title: 'Detail',
    },
  },
  type: 'object',
  title: 'HTTPValidationError',
} as const;

export const $Token = {
  properties: {
    access_token: {
      type: 'string',
      title: 'Access Token',
    },
    token_type: {
      type: 'string',
      title: 'Token Type',
      default: 'Bearer',
    },
  },
  type: 'object',
  required: ['access_token'],
  title: 'Token',
} as const;

export const $UserCreate = {
  properties: {
    email: {
      type: 'string',
      maxLength: 255,
      format: 'email',
      title: 'Email',
      description: '',
    },
    username: {
      type: 'string',
      maxLength: 100,
      minLength: 3,
      title: 'Username',
      description: '',
    },
    password: {
      type: 'string',
      maxLength: 100,
      minLength: 8,
      title: 'Password',
      description: '',
    },
  },
  type: 'object',
  required: ['email', 'username', 'password'],
  title: 'UserCreate',
} as const;

export const $UserPublic = {
  properties: {
    email: {
      type: 'string',
      maxLength: 255,
      format: 'email',
      title: 'Email',
      description: '',
    },
    username: {
      type: 'string',
      maxLength: 100,
      minLength: 3,
      title: 'Username',
      description: '',
    },
    id: {
      type: 'integer',
      title: 'Id',
    },
  },
  type: 'object',
  required: ['email', 'username', 'id'],
  title: 'UserPublic',
} as const;

export const $UserUpdateMe = {
  properties: {
    email: {
      anyOf: [
        {
          type: 'string',
          maxLength: 255,
          format: 'email',
        },
        {
          type: 'null',
        },
      ],
      title: 'Email',
    },
    username: {
      anyOf: [
        {
          type: 'string',
          maxLength: 255,
        },
        {
          type: 'null',
        },
      ],
      title: 'Username',
    },
  },
  type: 'object',
  title: 'UserUpdateMe',
} as const;

export const $ValidationError = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'integer',
          },
        ],
      },
      type: 'array',
      title: 'Location',
    },
    msg: {
      type: 'string',
      title: 'Message',
    },
    type: {
      type: 'string',
      title: 'Error Type',
    },
  },
  type: 'object',
  required: ['loc', 'msg', 'type'],
  title: 'ValidationError',
} as const;
