// src/app/gyms/page.tsx
import React from 'react';
import Header from '../../components/Header';
import WhyGymsSection from '../../components/WhyGymsSection'; 
import Link from 'next/link';

const GymsPage: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--black)' }}>
        
        {/* === Hero/Title Section for Gyms === */}
        <section className="hero" style={{ height: '70vh', minHeight: '400px', background: 'linear-gradient(0deg, #000 5%, #151515 100%)' }}>
          <div className="hero-overlay">
            <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>
              YOUR FITNESS <span className="accent">HUB</span>
            </h1>
            <p className="hero-desc" style={{ maxWidth: '800px' }}>
              We've built a world-class training environment right in your neighborhood. Discover the difference quality facilities and community support can make.
            </p>
          </div>
        </section>

        {/* === Why Gyms Section (Reusable Component) === */}
        <WhyGymsSection />
        
        {/* === Final Call to Action Section === */}
        <section className="cta" style={{ padding: '80px 0', background: '#070707' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--white)', fontWeight: '900', marginBottom: '20px' }}>
              READY TO <span className="accent">JOIN US?</span>
            </h2>
            <div className="hero-ctas">
                <Link href="/browsegyms">
                    <button className="btn solid">FIND YOUR GYM</button>
                </Link>
                <Link href="/partner">
                    <button className="btn outline">OPEN A GYM</button>
                </Link>
            </div>
          </div>
        </section>

      </main>
      <footer className="site-footer">
        <div className="container">
            Fit-Flix Fitness Studio &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
};

export default GymsPage;
