"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Só toma uma decisão depois que o estado de autenticação for confirmado
    if (!loading) {
      if (user) {
        // Se há um usuário, vai para a página principal
        router.push('/home');
      } else {
        // Se não há usuário, vai para a página de login
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  // Exibe uma tela de carregamento universal enquanto o Firebase verifica a sessão
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f5f9',
      color: '#7b2cbf',
      fontFamily: 'var(--font-display)',
    }}>
      <h1 style={{ fontSize: '3rem' }}>🎨 Nascente das Cores</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Carregando sua aventura...</p>
    </div>
  );
}
