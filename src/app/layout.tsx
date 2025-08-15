"use client"

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext'; // Importando o AuthProvider e o hook

const inter = Inter({ subsets: ['latin'] });

// Componente interno para renderizar o layout condicionalmente
function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth(); // Usando o hook para acessar o usuário

  // Não mostra Header/Sidebar na página de login
  // ou se o usuário não estiver logado (o AuthProvider já redireciona)
  if (pathname === '/login' || !user) {
    return <main>{children}</main>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1rem' }}>{children}</main>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
