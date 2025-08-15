"use client";

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: 'var(--background-color)',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--shadow)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
          {isLogin ? 'Bem-vindo(a) de volta!' : 'Crie sua conta!'}
        </h1>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            required
            style={{
              padding: '0.8rem',
              borderRadius: 'var(--border-radius)',
              border: '1px solid #ddd',
              fontSize: '1rem',
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            required
            style={{
              padding: '0.8rem',
              borderRadius: 'var(--border-radius)',
              border: '1px solid #ddd',
              fontSize: '1rem',
            }}
          />
          {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '-0.5rem' }}>{error}</p>}
          <button type="submit" style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: 'var(--secondary-color)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--border-radius)',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}>
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary-color)',
          cursor: 'pointer',
          fontSize: '0.9rem',
          marginBottom: '1rem',
        }}>
          {isLogin ? 'Não tem uma conta? Crie aqui!' : 'Já tem uma conta? Faça login!'}
        </button>
        <div style={{
          borderTop: '1px solid #eee',
          paddingTop: '1.5rem',
          marginTop: '1.5rem',
        }}>
          <button onClick={handleGoogleLogin} style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#db4437', /* Google Red */
            color: 'white',
            border: 'none',
            borderRadius: 'var(--border-radius)',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
          }}>
            <img src="/google-icon.svg" alt="Google Icon" style={{ width: '20px', height: '20px' }} />
            Entrar com Google
          </button>
        </div>
      </div>
    </div>
  );
}
