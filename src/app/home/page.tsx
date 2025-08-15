export default function HomePage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 100px)', // Ajusta para o tamanho do header
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: 'var(--border-radius)',
      boxShadow: 'var(--shadow)',
    }}>
      <h1 style={{ color: 'var(--primary-color)', fontSize: '3rem', marginBottom: '1rem' }}>
        🌟 Bem-vindo(a) à Plataforma Educativa! 🎨
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-color)', maxWidth: '600px', lineHeight: '1.5' }}>
        Explore um mundo de cores, jogos e aprendizado divertido. Escolha uma atividade no menu ao lado e comece a aventura!
      </p>
      <div style={{ fontSize: '5rem', marginTop: '2rem' }}>
        🌈📚🎮
      </div>
    </div>
  );
}
