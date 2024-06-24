import { useState, useEffect } from 'react';
import { isTokenValid } from '../services/requests/auth';

interface obj {
    id: number
}

export const toIdArray = (objs: any[]) => {
    return objs.map((i: obj) => i.id)
}



export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const data = await isTokenValid(token);
        if (data.isValid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    verifyToken();
  }, []);

  return isAuthenticated;
};
