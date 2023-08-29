export const createdLectureParam = {
  name: 'chapterId',
  description: 'Should provide chapterId to check if chapter exists.',
  example: '64d97510859dc4f83d9dc0c8',
  required: true,
};

export const createdLectureResponse = {
  status: 201,
  description: 'Create a new lecture for a specific chapter.',
  schema: {
    example: {
      success: true,
      statusCode: 201,
      message: 'Lecture created successfully.',
    },
  },
};
