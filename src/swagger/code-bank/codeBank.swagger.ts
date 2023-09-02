export const createdCodeBankResponse = {
  status: 201,
  description: 'Create all generated codes in database',
  schema: {
    example: {
      success: true,
      statusCode: 201,
      message: 'تم انشاء عدد 200 كود شراء بقيمة 50 جنيه للكود الواحد',
    },
  },
};

export const deletedCodeBankResponse = {
  status: 200,
  description: 'Delete all generated codes in database',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'Code Bank deleted successfully',
    },
  },
};
