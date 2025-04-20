export interface IDashboardData {
  semester_data: SemesterData;
  statistics: Statistics;
}

export interface SemesterData {
  currentSemester: string;
  currentSemesterTotalCourse: number;
  currentSemesterTotalStudents: number;
}

export interface Statistics {
  currentTotalStudents: string;
  totalStudents: string;
  totalPassedStudents: string;
  totalSemesterEnded: string;
  totalCourses: string;
  totalFaculties: string;
}
