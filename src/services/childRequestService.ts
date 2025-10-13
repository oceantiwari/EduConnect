interface ChildRequest {
  id: string;
  parentId: string;
  parentName: string;
  childName: string;
  childDob: string;
  relationship: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  adminNotes?: string;
}

let mockRequests: ChildRequest[] = [];

export const childRequestService = {
  async getPendingRequestsCount(): Promise<number> {
    return mockRequests.filter(r => r.status === 'PENDING').length;
  },

  async getRequestsByStatus(status?: 'PENDING' | 'APPROVED' | 'REJECTED'): Promise<ChildRequest[]> {
    if (!status) {
      return mockRequests;
    }
    return mockRequests.filter(r => r.status === status);
  },

  async createRequest(data: {
    parentId: string;
    parentName: string;
    childName: string;
    childDob: string;
    relationship: string;
  }): Promise<{ success: boolean; message: string }> {
    const newRequest: ChildRequest = {
      id: `req_${Date.now()}`,
      ...data,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    mockRequests.push(newRequest);
    return { success: true, message: 'Request submitted successfully' };
  },

  async approveRequest(requestId: string, adminNotes?: string): Promise<{ success: boolean; message: string }> {
    const request = mockRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'APPROVED';
      request.adminNotes = adminNotes;
      return { success: true, message: 'Request approved' };
    }
    return { success: false, message: 'Request not found' };
  },

  async rejectRequest(requestId: string, adminNotes: string): Promise<{ success: boolean; message: string }> {
    const request = mockRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'REJECTED';
      request.adminNotes = adminNotes;
      return { success: true, message: 'Request rejected' };
    }
    return { success: false, message: 'Request not found' };
  },
};
