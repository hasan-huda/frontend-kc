import { useState, useEffect } from "react";
import { authStateListener } from "./auth";
import { User } from "firebase/auth";
import cookie from 'js-cookie';

export const useAuth = () => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = authStateListener((user) => {
      setUser(user);
      if (user && adminEmail) {
        const isAdminStatus = adminEmail === user.email;
        setIsAdmin(isAdminStatus);
        
        if (isAdminStatus) {
          cookie.set('isAdmin', 'true', { expires: 1 }); 
        } else {
          cookie.remove('isAdmin');
        }
      } else {
        setIsAdmin(false);
        cookie.remove('isAdmin');
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [adminEmail]);

  return { user, isAdmin };
};




