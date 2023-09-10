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
