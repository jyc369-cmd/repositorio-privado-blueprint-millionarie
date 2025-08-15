"use client";

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log('Logged in with Google');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer' }}>
        {isLogin ? 'Criar uma conta' : 'Já tenho uma conta'}
      </button>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleGoogleLogin} style={{ padding: '0.5rem', backgroundColor: '#db4437', color: 'white', border: 'none', cursor: 'pointer' }}>
          Login com Google
        </button>
      </div>
    </div>
  );
}
