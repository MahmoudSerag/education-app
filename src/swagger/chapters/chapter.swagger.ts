export const createdChapterResponse = {
  status: 201,
  description: 'Create new chapter',
  schema: {
    example: {
      success: true,
      statusCode: 201,
      message: 'Chapter created successfully.',
    },
  },
};

export const deletedChapterResponse = {
  status: 200,
  description: 'Delete single chapter by chapterId',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message:
        'تم حذف الفصل بنجاح و لا يوجد محاضرات محذوفة تابعة لهذا الفصل. || تم حذف الفصل بنجاح وتم حذف المحاضرات التابعة لهذا الفصل بنجاح.',
    },
  },
};

export const deleteChapterParam = {
  name: 'chapterId',
  description: 'Should provide chapterId to delete single chapter',
  example: '5f2b4a7c4c5c4d5e6f7g8h9i',
  required: true,
};

export const updateChapterParam = {
  name: 'chapterId',
  description: 'Should provide chapterId to update single chapter',
  example: '5f2b4a7c4c5c4d5e6f7g8h9i',
  required: true,
};

export const updateChapterResponse = {
  status: 200,
  description: 'Update single chapter by chapterId',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'تم تعديل الفصل بنجاح.',
    },
  },
};

export const ChaptersFilterByAcademicYearQuery = {
  name: 'academicYear',
  description:
    'You can provide academicYear to get related chapters to this academicYear',
  example: '2',
  required: false,
};

export const getChaptersResponse = {
  status: 200,
  description: 'Fetch all chapters',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'Chapters fetched successfully.',
      chapters: [
        {
          _id: '64d97510859dc4f83d9dc0c8',
          title: 'المواد المصولة و المواد الغير موصلة',
          imageURL:
            'https://i.ibb.co/mSq8k9B/istockphoto-1023966316-1024x1024.jpg',
          academicYear: 2,
          description: 'النهاردة درس مهم موووت',
          createdAt: '2023-08-14T00:28:00.061Z',
          updatedAt: '2023-08-14T00:28:00.061Z',
        },
        {
          _id: '64da68e286a1df137c94af8a',
          title: 'المواد المصولة و المواد الغير موصلة',
          imageURL:
            'https://i.ibb.co/mSq8k9B/istockphoto-1023966316-1024x1024.jpg',
          academicYear: 2,
          description: 'النهاردة درس مهم موووت',
          createdAt: '2023-08-14T17:48:18.803Z',
          updatedAt: '2023-08-14T17:48:18.803Z',
        },
        `{ .......... }`,
      ],
    },
  },
};

export const searchChapterQuery = {
  name: 'title',
  description: 'Should provide title to search chapters',
  example: 'المواد المصولة و المواد الغير موصلة',
  required: true,
};

export const searchChapterResponse = {
  status: 200,
  description: 'Fetch filtered chapters',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'Chapters fetched successfully.',
      chapters: [
        {
          _id: '64d97510859dc4f83d9dc0c8',
          title: 'المواد المصولة و المواد الغير موصلة',
          imageURL:
            'https://i.ibb.co/mSq8k9B/istockphoto-1023966316-1024x1024.jpg',
          academicYear: 2,
          description: 'النهاردة درس مهم موووت',
          createdAt: '2023-08-14T00:28:00.061Z',
          updatedAt: '2023-08-14T00:28:00.061Z',
        },
        {
          _id: '64da68e286a1df137c94af8a',
          title: 'المواد المصولة و المواد الغير موصلة',
          imageURL:
            'https://i.ibb.co/mSq8k9B/istockphoto-1023966316-1024x1024.jpg',
          academicYear: 2,
          description: 'النهاردة درس مهم موووت',
          createdAt: '2023-08-14T17:48:18.803Z',
          updatedAt: '2023-08-14T17:48:18.803Z',
        },
        `{ .......... }`,
      ],
    },
  },
};

export const getChapterParam = {
  name: 'chapterId',
  description: 'Should provide chapterId to fetch chapter details',
  example: '64d97510859dc4f83d9dc0c8',
  required: true,
};

export const getChapterResponse = {
  status: 200,
  description: 'Fetch chapter details',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'Chapter fetched successfully.',
      chapters: [
        {
          _id: '64d97510859dc4f83d9dc0c8',
          title: 'المواد المصولة و المواد الغير موصلة',
          imageURL:
            'https://i.ibb.co/mSq8k9B/istockphoto-1023966316-1024x1024.jpg',
          academicYear: 2,
          description: 'النهاردة درس مهم موووت',
          createdAt: '2023-08-14T00:28:00.061Z',
          updatedAt: '2023-08-14T00:28:00.061Z',
        },
      ],
    },
  },
};
