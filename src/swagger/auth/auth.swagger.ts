export const registrationSuccessResponse = {
  status: 201,
  description: 'User registration',
  schema: {
    example: {
      success: true,
      statusCode: 201,
      message: 'User created successfully',
    },
  },
};

export const loginSuccessResponse = {
  status: 201,
  description: 'User login',
  schema: {
    example: {
      success: true,
      statusCode: 201,
      message: 'User logged in successfully',
    },
  },
};

export const passwordResetStepOneSuccessResponse = {
  status: 201,
  description: 'User reset password',
  schema: {
    example: {
      success: true,
      statusCode: 201,
      message: 'Please check your email to reset your password',
    },
  },
};

export const passwordResetStepTwoSuccessResponse = {
  status: 200,
  description: 'User reset password step two',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: "The user's session is active",
    },
  },
};

export const passwordResetStepThreeSuccessResponse = {
  status: 201,
  description: 'User reset password step three',
  schema: {
    example: {
      success: true,
      statusCode: 201,
      message: 'The user successfully reset his password',
    },
  },
};

export const logoutSuccessResponse = {
  status: 201,
  description: 'User logout',
  schema: {
    example: {
      success: true,
      statusCode: 201,
      message: 'User logged out successfully',
    },
  },
};
