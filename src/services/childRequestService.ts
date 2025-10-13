import { supabase } from '../lib/supabase';
import type { ChildRequest } from '../types';

export interface CreateChildRequestData {
  parentId: string;
  studentAdmissionNo: string;
  studentName: string;
  requestReason?: string;
}

export interface UpdateChildRequestData {
  status: 'APPROVED' | 'REJECTED';
  adminResponse?: string;
  reviewedBy: string;
}

export const childRequestService = {
  async createRequest(data: CreateChildRequestData): Promise<{ success: boolean; error?: string }> {
    try {
      const existingRequest = await this.checkExistingRequest(
        data.parentId,
        data.studentAdmissionNo
      );

      if (existingRequest) {
        return {
          success: false,
          error: 'You already have a pending request for this student'
        };
      }

      const { error } = await supabase.from('child_requests').insert({
        parent_id: data.parentId,
        student_admission_no: data.studentAdmissionNo.trim(),
        student_name: data.studentName.trim(),
        request_reason: data.requestReason?.trim() || null,
        status: 'PENDING'
      });

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error creating child request:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create request'
      };
    }
  },

  async checkExistingRequest(
    parentId: string,
    admissionNo: string
  ): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('child_requests')
        .select('id')
        .eq('parent_id', parentId)
        .eq('student_admission_no', admissionNo)
        .eq('status', 'PENDING')
        .maybeSingle();

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking existing request:', error);
      return false;
    }
  },

  async getRequestsByParent(parentId: string): Promise<ChildRequest[]> {
    try {
      const { data, error } = await supabase
        .from('child_requests')
        .select('*')
        .eq('parent_id', parentId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(this.mapToChildRequest);
    } catch (error) {
      console.error('Error fetching parent requests:', error);
      return [];
    }
  },

  async getRequestsByStatus(
    status?: 'PENDING' | 'APPROVED' | 'REJECTED'
  ): Promise<ChildRequest[]> {
    try {
      let query = supabase
        .from('child_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map(this.mapToChildRequest);
    } catch (error) {
      console.error('Error fetching requests:', error);
      return [];
    }
  },

  async getPendingRequestsCount(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('child_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'PENDING');

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error fetching pending requests count:', error);
      return 0;
    }
  },

  async approveRequest(
    requestId: string,
    adminId: string,
    adminResponse?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: request, error: fetchError } = await supabase
        .from('child_requests')
        .select('parent_id, student_admission_no')
        .eq('id', requestId)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!request) {
        return { success: false, error: 'Request not found' };
      }

      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('id, school_id')
        .eq('admission_no', request.student_admission_no)
        .maybeSingle();

      if (studentError) throw studentError;
      if (!student) {
        return {
          success: false,
          error: 'Student not found with this admission number'
        };
      }

      const { error: linkError } = await supabase
        .from('parent_student_links')
        .insert({
          parent_id: request.parent_id,
          student_id: student.id
        });

      if (linkError) {
        if (linkError.code === '23505') {
          return {
            success: false,
            error: 'This parent is already linked to this student'
          };
        }
        throw linkError;
      }

      const { error: updateError } = await supabase
        .from('child_requests')
        .update({
          status: 'APPROVED',
          admin_response: adminResponse || 'Request approved and child linked successfully',
          reviewed_by: adminId,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (updateError) throw updateError;

      return { success: true };
    } catch (error) {
      console.error('Error approving request:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to approve request'
      };
    }
  },

  async rejectRequest(
    requestId: string,
    adminId: string,
    adminResponse: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (!adminResponse.trim()) {
        return { success: false, error: 'Please provide a reason for rejection' };
      }

      const { error } = await supabase
        .from('child_requests')
        .update({
          status: 'REJECTED',
          admin_response: adminResponse.trim(),
          reviewed_by: adminId,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error rejecting request:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to reject request'
      };
    }
  },

  mapToChildRequest(data: any): ChildRequest {
    return {
      id: data.id,
      parentId: data.parent_id,
      studentAdmissionNo: data.student_admission_no,
      studentName: data.student_name,
      status: data.status,
      requestReason: data.request_reason,
      adminResponse: data.admin_response,
      reviewedBy: data.reviewed_by,
      reviewedAt: data.reviewed_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }
};
