import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setLogged(true);
    }
  }, []);

  const login = () => { 
    localStorage.setItem('authToken', 'my-auth-token');
    setLogged(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};