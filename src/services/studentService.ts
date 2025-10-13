import { Student } from '../types';

const mockStudents: Student[] = [];

export const studentService = {
  async getStudentsByParentId(parentId: string): Promise<Student[]> {
    return mockStudents.filter(s => s.parentIds.includes(parentId));
  },

  async getStudentById(studentId: string): Promise<Student | null> {
    return mockStudents.find(s => s.id === studentId) || null;
  },

  async createStudent(data: Omit<Student, 'id'>): Promise<{ success: boolean; student?: Student }> {
    const newStudent: Student = {
      id: `student_${Date.now()}`,
      ...data,
    };
    mockStudents.push(newStudent);
    return { success: true, student: newStudent };
  },

  async updateStudent(studentId: string, data: Partial<Student>): Promise<{ success: boolean }> {
    const index = mockStudents.findIndex(s => s.id === studentId);
    if (index !== -1) {
      mockStudents[index] = { ...mockStudents[index], ...data };
      return { success: true };
    }
    return { success: false };
  },

  async deleteStudent(studentId: string): Promise<{ success: boolean }> {
    const index = mockStudents.findIndex(s => s.id === studentId);
    if (index !== -1) {
      mockStudents.splice(index, 1);
      return { success: true };
    }
    return { success: false };
  },
};
