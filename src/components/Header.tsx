import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h1>Plataforma Educativa</h1>
      <div>
        <Link href="/login">Login</Link>
      </div>
    </header>
  );
}
