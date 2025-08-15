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
      padding: '1rem 2rem',
      borderBottom: '2px solid var(--accent-color)',
      backgroundColor: 'var(--primary-color)',
      color: 'white',
      boxShadow: 'var(--shadow)',
      zIndex: 10,
    }}>
      <Link href="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>🎨 Kids Fun Platform</h1>
      </Link>
      <div>
        {user ? (
          <button onClick={handleLogout} style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: 'var(--secondary-color)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--border-radius)',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}>
            Sair
          </button>
        ) : (
          <Link href="/login" style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: 'var(--secondary-color)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 'var(--border-radius)',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
