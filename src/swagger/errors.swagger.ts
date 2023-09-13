export const apiUnauthorizedResponse = {
  status: 401,
  description: `You don't have permission to do that.`,
  schema: {
    example: {
      success: false,
      statusCode: 401,
      message: 'Unauthorized: Login first.',
    },
  },
};

export const apiBadRequestResponse = {
  status: 400,
  description: 'The request you made is invalid or malformed.',
  schema: {
    example: {
      success: false,
      statusCode: 400,
      message: 'Bad request.',
    },
  },
};

export const apiConflictResponse = {
  status: 409,
  description:
    'The request you made cannot be processed because it conflicts with another request.',
  schema: {
    example: {
      success: false,
      statusCode: 409,
      message: 'Conflict Request.',
    },
  },
};

export const apiNotFoundResponse = {
  status: 404,
  description: 'The resource you requested does not exist.',
  schema: {
    example: {
      success: false,
      statusCode: 404,
      message: 'Not found.',
    },
  },
};

export const apiNotAcceptableResponse = {
  status: 406,
  description:
    'The requested resource is not available in the requested format.',
  schema: {
    example: {
      success: false,
      statusCode: 406,
      message: 'Not acceptable.',
    },
  },
};

export const apiForbiddenResponse = {
  status: 403,
  description:
    'The request was denied: User not allowed to access this content.',
  schema: {
    example: {
      success: false,
      statusCode: 403,
      message: 'Forbidden.',
    },
  },
};

export const apiInternalServerErrorResponse = {
  status: 500,
  description:
    'The server encountered an unexpected condition and was unable to fulfill the request.',
  schema: {
    example: {
      success: false,
      statusCode: 500,
      message: 'Internal server error.',
    },
  },
};
