const API_BASE_URL = 'https://bug-checker.onrender.com/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return handleResponse(response);
};

export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return handleResponse(response);
};

export const getBugs = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  const response = await fetch(`${API_BASE_URL}/bugs?${params}`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response);
};

export const createBug = async (bugData) => {
  const response = await fetch(`${API_BASE_URL}/bugs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(bugData)
  });
  return handleResponse(response);
};

export const updateBugStatus = async (bugId, status) => {
  const response = await fetch(`${API_BASE_URL}/bugs/${bugId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  });
  return handleResponse(response);
};