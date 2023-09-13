export const userProfile = {
  name: 'User Profile',
  description: 'Fetch user profile',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'User profile fetched successfully',
      userProfile: {
        _id: '64bdba13453cc737c5a34566',
        email: 'sragmahmoud4@gmail.com',
        fullName: 'محمود سراج اسماعيل',
        academicYear: 2,
        phoneNumber: '01064560430',
        sex: 'ذكر',
        wallet: 0,
      },
    },
  },
};

export const updatedUserProfile = {
  name: 'User Profile',
  description: 'Fetch user profile',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'User profile fetched successfully',
    },
  },
};

export const updatedUserPassword = {
  name: 'User password',
  description: 'Update user password',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'Password updated successfully',
    },
  },
};

export const chargedWallet = {
  name: 'User wallet',
  description: 'Update user wallet',
  schema: {
    example: {
      success: true,
      statusCode: 201,
      message: 'Wallet charged successfully',
    },
  },
};
