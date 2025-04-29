import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    const response = await authService.getUser();

    if (response?.error) {
      setUser(null);
    } else {
      setUser(response);
    }

    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await authService.login(email, password);

    if (response?.error) {
      return response;
    }

    await checkUser();
    return { success: true };
  };

  const register = async (email, password, name) => {
    try {
      const response = await authService.register(email, password, name);
  
      if (response?.error) {
        return response;
      }
  
      await checkUser();
      return { success: true }; // ✅ Add this line
    } catch (error) {
      console.error('Register error in AuthContext:', error);
      return { error: error.message || 'Unexpected registration error' };
    }
  };
  
  

  const logout = async () => {
    await authService.logout();
    setUser(null);
    await checkUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
