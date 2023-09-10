export const statistics = {
  status: 200,
  description: 'statistics fetched successfully.',
  schema: {
    example: {
      statistics: {
        success: true,
        statusCode: 200,
        message: 'Statistics fetched successfully.',
        statistics: {
          numberOfStudents: 9,
          numberOfLectures: 5,
          studentsInYearOne: 4,
          studentsInYearTwo: 5,
          studentsInYearThree: 0,
        },
      },
    },
  },
};

export const studentsList = {
  status: 200,
  description: 'Students list fetched successfully.',
  schema: {
    example: {
      success: true,
      statusCode: 200,
      message: 'Students list fetched successfully.',
      totalStudentsCount: 9,
      studentsPerPage: 10,
      maxPages: 1,
      currentPage: 1,
      studentsList: [
        {
          _id: '64b0b6a54b9fa8315d2cb45a',
          email: 'sragmahmoud400@gmail.com',
          fullName: 'محمود سراج اسماعيل',
          academicYear: 2,
          phoneNumber: '01064560400',
          sex: 'ذكر',
        },
        {
          _id: '64bdb9ea453cc737c5a34562',
          email: 'sragmahmoud40@gmail.com',
          fullName: 'محمود سراج اسماعيل',
          academicYear: 2,
          phoneNumber: '01064560420',
          sex: 'ذكر',
        },
      ],
    },
  },
};
