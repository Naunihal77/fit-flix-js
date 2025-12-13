// src/app/gyms/page.tsx
import React from 'react';
import Header from '../../components/Header';
import WhyGymsSection from '../../components/WhyGymsSection'; 
import GymFacilities from '../../components/GymFacilities';
import Link from 'next/link';

const GymsPage: React.FC = () => {

  // Correct video file name
  const videoSrc = '/videos/background.mp4';

  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--black)' }}>
        
        {/* === Hero Section with Video Background === */}
        <section className="hero" style={{ height: '70vh', minHeight: '400px', background: 'black', position: 'relative', overflow: 'hidden' }}>
          
          <video
            autoPlay
            loop
            muted     // <--- required for autoplay on Chrome
            playsInline
            className="hero-video"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              filter: 'brightness(0.35)'
            }}
          >
            <source src={videoSrc} type="video/mp4" />  
            Your browser does not support the video tag.
          </video>

          {/* HERO TEXT LAYER */}
          <div
            className="hero-overlay"
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              color: 'white',
              padding: '20px'
            }}
          >
            <h1 className="hero-title" style={{ fontSize: '4.5rem', fontWeight: '900' }}>
              YOUR FITNESS <span className="accent">HUB</span>
            </h1>

            <p className="hero-desc" style={{ maxWidth: '800px', margin: '0 auto', marginTop: '10px' }}>
              We've built a world-class training environment right in your neighborhood. 
              Discover the difference quality facilities and community support can make.
            </p>
          </div>
        </section>

        {/* 1. Facilities Section */}
        <GymFacilities />

        {/* 2. Why Gyms Section */}
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
