const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function getApiUrl(path) {
  return `${API_URL}${path.startsWith('/') ? path : '/' + path}`;
}