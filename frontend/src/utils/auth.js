export const storeAuth = (token, user) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('authUser', JSON.stringify(user));
};


export const getStoredAuth = () => {
  const token = localStorage.getItem('authToken');
  const userStr = localStorage.getItem('authUser');
  
  if (!token || !userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return { token, user };
  } catch {
    return null;
  }
};



export const clearStoredAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
};