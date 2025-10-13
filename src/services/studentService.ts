import { supabase } from '../lib/supabase';
import type { Student } from '../types';

export const studentService = {
  async getStudentsByParent(parentId: string): Promise<Student[]> {
    try {
      const { data, error } = await supabase
        .from('parent_student_links')
        .select(`
          student_id,
          students (
            id,
            first_name,
            last_name,
            admission_no,
            class_id,
            section,
            roll_no,
            profile_photo
          )
        `)
        .eq('parent_id', parentId);

      if (error) throw error;

      return (data || [])
        .filter(item => item.students)
        .map(item => {
          const student = Array.isArray(item.students) ? item.students[0] : item.students;
          return {
            id: student.id,
            firstName: student.first_name,
            lastName: student.last_name,
            admissionNo: student.admission_no,
            classId: student.class_id,
            section: student.section,
            rollNo: student.roll_no,
            parentIds: [parentId],
            profilePhoto: student.profile_photo
          };
        });
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  },

  async getStudentByAdmission(admissionNo: string): Promise<Student | null> {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('admission_no', admissionNo)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        admissionNo: data.admission_no,
        classId: data.class_id,
        section: data.section,
        rollNo: data.roll_no,
        parentIds: [],
        profilePhoto: data.profile_photo
      };
    } catch (error) {
      console.error('Error fetching student:', error);
      return null;
    }
  }
};
