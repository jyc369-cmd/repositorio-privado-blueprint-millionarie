"use client";

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Importando o useRouter
import { useAuth } from '@/context/AuthContext'; // Importando o useAuth

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  // Se o usuário já estiver logado, redireciona para a home
  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpa erros anteriores
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // O redirecionamento será tratado pelo useEffect
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
      // O redirecionamento será tratado pelo useEffect
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '300px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer' }}>
        {isLogin ? 'Criar uma conta' : 'Já tenho uma conta'}
      </button>
      <div style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem', width: '100%', maxWidth: '300px', textAlign: 'center' }}>
        <button onClick={handleGoogleLogin} style={{ padding: '0.5rem', backgroundColor: '#db4437', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', width: '100%' }}>
          Login com Google
        </button>
      </div>
    </div>
  );
}
