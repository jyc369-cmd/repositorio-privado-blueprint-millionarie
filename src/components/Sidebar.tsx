"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Objeto de configuração para os links da sidebar
const navLinks = [
  { href: "/home", label: "Início", icon: "🏠" },
  { href: "/desenhos", label: "Desenhos do Dia", icon: "🎨" },
  { href: "/galeria", label: "Minha Galeria", icon: "🖼️" },
  { href: "/jogos", label: "Jogos Educativos", icon: "🎮" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '250px',
      minWidth: '250px',
      backgroundColor: 'var(--white-color)',
      borderRight: '1px solid #e0e0e0',
      padding: '2rem 1.5rem',
      boxShadow: 'var(--shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    }}>
      <nav>
        <ul style={{ padding: 0, margin: 0 }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} style={{ listStyle: 'none', marginBottom: '1rem' }}>
                <Link href={link.href} style={{
                  textDecoration: 'none',
                  color: isActive ? 'var(--white-color)' : 'var(--primary-color)',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
