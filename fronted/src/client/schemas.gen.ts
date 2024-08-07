// This file is auto-generated by @hey-api/openapi-ts

export const $HTTPValidationError = {
  properties: {
    detail: {
      items: {
        $ref: "#/components/schemas/ValidationError",
      },
      type: "array",
      title: "Detail",
    },
  },
  type: "object",
  title: "HTTPValidationError",
} as const

export const $Message = {
  properties: {
    detail: {
      type: "string",
      title: "Detail",
    },
  },
  type: "object",
  required: ["detail"],
  title: "Message",
} as const

export const $UserCreate = {
  properties: {
    email: {
      type: "string",
      maxLength: 255,
      format: "email",
      title: "Email",
    },
    username: {
      type: "string",
      maxLength: 255,
      minLength: 3,
      title: "Username",
    },
    full_name: {
      type: "string",
      maxLength: 255,
      title: "Full Name",
    },
    password: {
      type: "string",
      maxLength: 40,
      minLength: 8,
      title: "Password",
    },
  },
  type: "object",
  required: ["email", "username", "full_name", "password"],
  title: "UserCreate",
} as const

export const $UserRead = {
  properties: {
    email: {
      type: "string",
      maxLength: 255,
      format: "email",
      title: "Email",
    },
    username: {
      type: "string",
      maxLength: 255,
      minLength: 3,
      title: "Username",
    },
    full_name: {
      type: "string",
      maxLength: 255,
      title: "Full Name",
    },
    id: {
      type: "string",
      format: "uuid",
      title: "Id",
    },
  },
  type: "object",
  required: ["email", "username", "full_name", "id"],
  title: "UserRead",
} as const

export const $ValidationError = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: "string",
          },
          {
            type: "integer",
          },
        ],
      },
      type: "array",
      title: "Location",
    },
    msg: {
      type: "string",
      title: "Message",
    },
    type: {
      type: "string",
      title: "Error Type",
    },
  },
  type: "object",
  required: ["loc", "msg", "type"],
  title: "ValidationError",
} as const
