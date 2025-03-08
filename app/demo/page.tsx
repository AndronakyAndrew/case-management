'use client'
export default function Demo() {
    return (
        <div style={{ 
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', 
            maxWidth: '1000px', 
            margin: '40px auto', 
            padding: '30px',
            background: 'linear-gradient(135deg, #fff, #f0f0f0)',
            borderRadius: '10px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
            <header style={{
                textAlign: 'center',
                paddingBottom: '20px',
                borderBottom: '2px solid #eaeaea'
            }}>
                <h1 style={{ 
                    color: '#2c3e50', 
                    margin: 0,
                    fontSize: '2.5rem'
                }}>Демо-страница</h1>
                <p style={{
                    color: '#95a5a6',
                    margin: '10px 0 0',
                    fontSize: '1rem'
                }}>Добро пожаловать в наше интерактивное демо</p>
            </header>

            <main style={{ marginTop: '30px' }}>
                <section style={{ 
                    margin: '20px 0', 
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                }} 
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)' }} 
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}>
                    <h2 style={{ color: '#34495e', marginBottom: '10px' }}>Будущие возможности</h2>
                    <p style={{ 
                        lineHeight: 1.6, 
                        color: '#555'
                    }}>
                        Наша будущая функциональность разработана для улучшения вашего опыта, предлагая инновационные инструменты и усовершенствованные сервисы.
                    </p>
                </section>

                <section style={{ 
                    margin: '20px 0', 
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                }}>
                    <h2 style={{ color: '#34495e', marginBottom: '10px' }}>Возможности</h2>
                    <p style={{ 
                        lineHeight: 1.6, 
                        color: '#555'
                    }}>
                        Исследуйте множество возможностей — от продвинутой аналитики и динамических панелей до персонализированного пользовательского опыта.
                    </p>
                    <button style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#2980b9',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, transform 0.3s ease'
                    }}
                    onMouseEnter={e => { 
                        e.currentTarget.style.backgroundColor = '#1f6391'; 
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => { 
                        e.currentTarget.style.backgroundColor = '#2980b9'; 
                        e.currentTarget.style.transform = 'scale(1)';
                    }}>
                        Подробнее
                    </button>
                </section>

                <section style={{ 
                    margin: '20px 0', 
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                }}>
                    <h2 style={{ color: '#34495e', marginBottom: '10px' }}>Интерактивная галерея</h2>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                    }}>
                        {Array(4).fill(0).map((_, index) => (
                            <div key={index} style={{
                                flex: '1 1 calc(50% - 10px)',
                                height: '150px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={e => { 
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={e => { 
                                e.currentTarget.style.transform = 'scale(1)';
                            }}>
                                <img 
                                    src={`${index + 1}`} 
                                    alt={`Image ${index + 1}`} 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover' 
                                    }} 
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer style={{ 
                marginTop: '40px', 
                textAlign: 'center', 
                borderTop: '2px solid #eaeaea', 
                paddingTop: '20px' 
            }}>
                <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} Genesis Industries. Все права защищены.
                </p>
            </footer>
        </div>
    )
}