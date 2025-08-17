"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2.5rem',
      backgroundImage: 'linear-gradient(to right, #7b2cbf, #9d4edd)',
      color: 'var(--white-color)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      zIndex: 100,
    }}>
      <Link href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '2.2rem', 
          fontFamily: 'var(--font-display)',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}>
          🎨 Nascente das Cores
        </h1>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {user && (
          <span style={{ fontWeight: '600', fontSize: '1rem' }}>
            Olá, {user.displayName || user.email}!
          </span>
        )}
        {user ? (
          <button onClick={handleLogout} style={{
            padding: '10px 20px',
            backgroundColor: 'transparent',
            color: 'var(--white-color)',
            border: '2px solid var(--white-color)',
            borderRadius: 'var(--border-radius)',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}>
            Sair
          </button>
        ) : (
          <Link href="/login" style={{
            padding: '10px 20px',
            backgroundColor: 'var(--white-color)',
            color: 'var(--primary-color)',
            textDecoration: 'none',
            borderRadius: 'var(--border-radius)',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
