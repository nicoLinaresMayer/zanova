export default function Home() {
  return (
    <main
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Fondo difuminado */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          //backgroundImage: "url('/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.1)', // evita bordes visibles por el blur
        }}
      />

      {/* Capa oscura opcional para contraste */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />

      {/* Imagen principal (sin escalar) */}
      <img
        src="/bg.jpg"
        alt=""
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 'none',
          zIndex: 1,
        }}
      />

      {/* Texto */}
      <h1
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: 'Engry',
          fontSize: '6rem',
          color: 'white',
          textAlign: 'center',
          top: '40%',
          transform: 'translateY(-50%)',
          textShadow: '0 4px 20px rgba(0,0,0,0.8)',
        }}
      >
        ZANOVA
      </h1>
    </main>
  );
}
