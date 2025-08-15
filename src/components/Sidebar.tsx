import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{ width: '200px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <nav>
        <ul>
          <li style={{ listStyle: 'none', marginBottom: '1rem' }}>
            <Link href="/home">Início</Link>
          </li>
          <li style={{ listStyle: 'none', marginBottom: '1rem' }}>
            <Link href="/desenhos">Desenhos do Dia</Link>
          </li>
          <li style={{ listStyle: 'none', marginBottom: '1rem' }}>
            <Link href="/jogos">Jogos Educativos</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
