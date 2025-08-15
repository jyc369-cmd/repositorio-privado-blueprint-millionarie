import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{
      width: '220px',
      minWidth: '220px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #eee',
      padding: '1.5rem 1rem',
      boxShadow: 'var(--shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      <nav>
        <ul style={{ padding: 0, margin: 0 }}>
          <li style={{ listStyle: 'none', marginBottom: '1rem' }}>
            <Link href="/home" style={{
              textDecoration: 'none',
              color: 'var(--primary-color)',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              padding: '0.8rem',
              display: 'block',
              borderRadius: 'var(--border-radius)',
              transition: 'background-color 0.2s ease, color 0.2s ease',
            }}>
              Início
            </Link>
          </li>
          <li style={{ listStyle: 'none', marginBottom: '1rem' }}>
            <Link href="/desenhos" style={{
              textDecoration: 'none',
              color: 'var(--primary-color)',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              padding: '0.8rem',
              display: 'block',
              borderRadius: 'var(--border-radius)',
              transition: 'background-color 0.2s ease, color 0.2s ease',
            }}>
              Desenhos do Dia
            </Link>
          </li>
          <li style={{ listStyle: 'none', marginBottom: '1rem' }}>
            <Link href="/jogos" style={{
              textDecoration: 'none',
              color: 'var(--primary-color)',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              padding: '0.8rem',
              display: 'block',
              borderRadius: 'var(--border-radius)',
              transition: 'background-color 0.2s ease, color 0.2s ease',
            }}>
              Jogos Educativos
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
