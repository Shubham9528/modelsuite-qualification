import API from './axios';
// but the token interceptor in axios.js must still fire (it does via the shared instance)
export const submitTask = (taskId, formData) =>
  API.post(`/submissions/${taskId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const fetchSubmission = (taskId) => API.get(`/submissions/${taskId}`);

export const fetchAllSubmissions = (page = 1, limit = 10) => API.get(`/submissions/admin/all?page=${page}&limit=${limit}`);

export const reviewSubmission = (id, reviewStatus) =>
  API.put(`/submissions/${id}/review`, { reviewStatus });

