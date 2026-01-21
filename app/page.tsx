export default function Home() {
  return (
    <main
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >

      {/* Capa oscura opcional para contraste */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#161616',
        }}
      />

      {/* Imagen principal (sin escalar) */}


      {/* Texto */}
      <h1
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: 'Engry',
          fontSize: '6rem',
          color: '#edebe6',
          textAlign: 'center',
          top: '40%',
          transform: 'translateY(-50%)',
          //textShadow: '0 4px 20px rgba(0,0,0,0.8)',
        }}
      >
        ZANOVA
      </h1>
            <h2
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: 'Alike',
          fontSize: '4rem',
          color: '#edebe6',
          textAlign: 'center',
          top: '30%',
          transform: 'translateY(-50%)',
          //textShadow: '0 4px 20px rgba(0,0,0,0.8)',
        }}
      >
        is coming
      </h2>
    </main>
  );
}
