"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("AuthProvider: Setting up Firebase auth listener...");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Este log é o mais importante. Ele nos dirá o que o Firebase está pensando.
      console.log("AuthProvider: onAuthStateChanged event fired. User object:", user);
      setUser(user);
      setLoading(false);
    });

    // Limpa o listener quando o componente é desmontado
    return () => {
      console.log("AuthProvider: Cleaning up Firebase auth listener.");
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Este log nos dirá por que um redirecionamento acontece.
    console.log(`AuthProvider: Checking redirect logic. Path: ${pathname}, Loading: ${loading}, User exists: ${!!user}`);
    if (!loading && !user && pathname !== '/login') {
      console.log(`AuthProvider: REDIRECTING to /login because user is not authenticated.`);
      router.push('/login');
    }
  }, [user, loading, pathname, router]);


  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <p>Carregando...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
