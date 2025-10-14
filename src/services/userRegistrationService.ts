import { supabase } from '../lib/supabase';

export interface UserRegistrationRequest {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'PARENT' | 'TEACHER';
  schoolId: string;
  schoolName?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestReason?: string;
  adminResponse?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const userRegistrationService = {
  async getRequestsByStatus(
    schoolId: string,
    status?: 'PENDING' | 'APPROVED' | 'REJECTED'
  ): Promise<UserRegistrationRequest[]> {
    try {
      let query = supabase
        .from('user_registration_requests')
        .select(`
          *,
          schools (
            name
          )
        `)
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((req: any) => ({
        id: req.id,
        email: req.email,
        name: req.name,
        phone: req.phone,
        role: req.role,
        schoolId: req.school_id,
        schoolName: req.schools?.name,
        status: req.status,
        requestReason: req.request_reason,
        adminResponse: req.admin_response,
        reviewedBy: req.reviewed_by,
        reviewedAt: req.reviewed_at,
        createdAt: req.created_at,
        updatedAt: req.updated_at
      }));
    } catch (error) {
      console.error('Error fetching registration requests:', error);
      return [];
    }
  },

  async getPendingRequestsCount(schoolId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('user_registration_requests')
        .select('*', { count: 'exact', head: true })
        .eq('school_id', schoolId)
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
        .from('user_registration_requests')
        .select('*')
        .eq('id', requestId)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!request) {
        return { success: false, error: 'Request not found' };
      }

      const { error: existingUserError, data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', request.email)
        .maybeSingle();

      if (existingUser) {
        return {
          success: false,
          error: 'A user with this email already exists'
        };
      }

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          email: request.email,
          name: request.name,
          phone: request.phone,
          role: request.role,
          school_id: request.school_id,
          status: 'ACTIVE'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const { error: updateError } = await supabase
        .from('user_registration_requests')
        .update({
          status: 'APPROVED',
          admin_response: adminResponse || 'Registration approved successfully',
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
        .from('user_registration_requests')
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
  }
};
