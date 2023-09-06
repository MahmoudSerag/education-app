export const createdLectureParam = {
  name: 'chapterId',
  description: 'Should provide chapterId to handle rest of the process.',
  example: '64d97510859dc4f83d9dc0c8',
  required: true,
};

export const updatedLectureParam = {
  name: 'lectureId',
  description: 'Should provide lectureId to handle rest of the process.',
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

export const lectureListResponse = {
  status: 200,
  description: 'Update and existing lecture.',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'Lectures fetched successfully.',
      totalLecturesCount: 19,
      lecturesPerPage: 10,
      maxPages: 2,
      currentPage: 1,
      lectures: [
        {
          _id: '64f4993719980f70f976e156',
          title: 'My Title',
          imageURL: 'https://example.com/image.jpg',
          academicYear: 1,
          price: 250,
          chapterTitle: 'المواد المصولة و المواد الغير موصلة',
        },
        {
          _id: '64f4993a19980f70f976e15b',
          title: 'My Title',
          imageURL: 'https://example.com/image.jpg',
          academicYear: 1,
          price: 250,
          chapterTitle: 'المواد المصولة و المواد الغير موصلة',
        },
        {
          _id: '64f4993c19980f70f976e160',
          title: 'My Title',
          imageURL: 'https://example.com/image.jpg',
          academicYear: 1,
          price: 250,
          chapterTitle: 'المواد المصولة و المواد الغير موصلة',
        },
      ],
    },
  },
};

export const pageQueryParam = {
  name: 'page',
  description: 'Should provide page number to return lectures.',
  example: 1,
  required: true,
};

export const deletedLectureResponse = {
  status: 200,
  description: 'Delete a lecture by lectureId.',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'Lecture deleted successfully.',
    },
  },
};

export const singleLectureResponse = {
  status: 200,
  description: 'Fetch a lecture by lectureId.',
  schema: {
    success: true,
    statusCode: 200,
    message: 'Lecture fetched successfully.',
    lecture: {
      _id: '64f4fb66a8469bd632604b28',
      title: 'My Title',
      imageURL: 'https://example.com/image.jpg',
      academicYear: 1,
      price: 250,
      videoURLs: [
        'https://www.youtube.com/watch?v=ctjgMbjvX7U',
        'https://www.youtube.com/watch?v=ctjgMbjvX7U',
      ],
      pdfFiles: ['Contract.pdf', 'Backend task.pdf'],
      chapterTitle: 'المواد المصولة و المواد الغير موصلة',
    },
  },
};
