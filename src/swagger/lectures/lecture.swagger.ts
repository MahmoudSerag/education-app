export const createdLectureParam = {
  name: 'chapterId',
  description:
    'Should provide chapterId to check if chapter exists, then create lecture.',
  example: '64d97510859dc4f83d9dc0c8',
  required: true,
};

export const createdLectureIdParam = {
  name: 'lectureId',
  description: 'Should provide lectureId to update and existing lecture.',
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

export const updatedLectureResponse = {
  status: 200,
  description: 'Update and existing lecture.',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'Lecture updated successfully.',
    },
  },
};
