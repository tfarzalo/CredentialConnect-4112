import axios from 'axios';
import type { Provider, Group, Credential } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const providersApi = {
  getAll: () => api.get<Provider[]>('/providers'),
  getById: (id: string) => api.get<Provider>(`/providers/${id}`),
  create: (data: Partial<Provider>) => api.post<Provider>('/providers', data),
  update: (id: string, data: Partial<Provider>) => api.put<Provider>(`/providers/${id}`, data),
  delete: (id: string) => api.delete(`/providers/${id}`),
  importFromCAQH: (caqhId: string) => api.post<Provider>('/providers/caqh-import', { caqhId }),
};

export const groupsApi = {
  getAll: () => api.get<Group[]>('/groups'),
  getById: (id: string) => api.get<Group>(`/groups/${id}`),
  create: (data: Partial<Group>) => api.post<Group>('/groups', data),
  update: (id: string, data: Partial<Group>) => api.put<Group>(`/groups/${id}`, data),
  delete: (id: string) => api.delete(`/groups/${id}`),
};

export const credentialsApi = {
  getAll: () => api.get<Credential[]>('/credentials'),
  getById: (id: string) => api.get<Credential>(`/credentials/${id}`),
  create: (data: Partial<Credential>) => api.post<Credential>('/credentials', data),
  update: (id: string, data: Partial<Credential>) => api.put<Credential>(`/credentials/${id}`, data),
  updateStatus: (id: string, status: string) => 
    api.patch<Credential>(`/credentials/${id}/status`, { status }),
};

export const documentsApi = {
  upload: (file: File, metadata: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    return api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id: string) => api.delete(`/documents/${id}`),
};