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
      setError("Ops! E-mail ou senha inválidos. Tente novamente.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setError("Ocorreu um erro ao tentar logar com o Google.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundImage: 'linear-gradient(to top, #f3e7f9, #d4c1ec)',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '50px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3rem',
          color: 'var(--primary-color)',
          lineHeight: 1.2,
          marginBottom: '1rem',
        }}>
          {isLogin ? 'Que bom te ver!' : 'Crie sua conta Mágica!'}
        </h2>
        <p style={{ marginBottom: '2.5rem', color: '#6c757d', fontSize: '1.1rem' }}>
          {isLogin ? 'Vamos colorir e aprender juntos.' : 'Uma aventura de cores te espera.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha secreta"
            required
          />
          {error && <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
          <button type="submit">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary-color)',
          cursor: 'pointer',
          fontSize: '0.9rem',
          marginTop: '1.5rem',
          fontWeight: '600'
        }}>
          {isLogin ? 'Não tem uma conta? Crie aqui!' : 'Já tem uma conta? Faça login!'}
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          margin: '2rem 0',
        }}>
          <hr style={{flex: 1, borderColor: '#e0e0e0'}} />
          <span style={{ padding: '0 1rem', color: '#aaa' }}>OU</span>
          <hr style={{flex: 1, borderColor: '#e0e0e0'}} />
        </div>

        <button onClick={handleGoogleLogin} style={{
          backgroundColor: '#4285F4', /* Google Blue */
          backgroundImage: 'none',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px'
        }}>
          <img src="/google-icon.svg" alt="Google Icon" style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', padding: '2px' }} />
          Entrar com Google
        </button>
      </div>
    </div>
  );
}
