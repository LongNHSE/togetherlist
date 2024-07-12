import http from '@/lib/http';
const memberApiRequest = {
  getMemberList: (workspaceId: string | undefined) =>
    http.get(`/workspaces/${workspaceId}/members`),
  addMember: (workspaceId: string, email: string) =>
    http.post(`/workspaces/${workspaceId}/members`, { email }),
  removeMember: (workspaceId: string, memberId: string) =>
    http.delete(`/workspaces/${workspaceId}/members/${memberId}`, {}),
  updateMemberRole: (workspaceId: string, memberId: string, role: string) =>
    http.patch(`/workspaces/${workspaceId}/members/${memberId}`, { role }),

  getOwner: (workspaceId: string | undefined) =>
    http.get(`/workspaces/${workspaceId}/owner`),
  addMemberByEmail: (workspaceId: string, email: string) =>
    http.post(`/workspaces/${workspaceId}/members/email`, { email }),
};

export default memberApiRequest;
