// src/components/EssentialsSection.tsx
import React from 'react';
import Link from 'next/link';

const EssentialsSection: React.FC = () => {
  return (
    // Uses standard styles and the global .container class from home.css
    <section style={{ padding: '70px 0', background: 'var(--black)', color: 'var(--white)' }}>
      <div className="container">
        <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--white)', marginBottom: '30px' }}>
          THE ESSENTIALS
        </h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '700px', marginBottom: '40px', color: 'rgba(255,255,255,0.85)' }}>
          You only need to know a few things before you start a FIT-FLIX class. Don't worry, we'll teach you everything you need to know at the start of every class.
        </p>

        {/* Essential Tips List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '700px' }}>
          
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '5px' }}>
              1. THE STANCE:
            </h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
              If you’re right-handed, put your left foot in front of you, right foot behind, shoulder width apart.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '5px' }}>
              2. GUARD UP:
            </h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
              Always have your arms over your face—this is good practice to protect your face and keeps your arms in the best position to execute all punches.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '5px' }}>
              3. BREATHE:
            </h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
              After each punch, make sure you breathe out—this will help you last the entire 50 minutes!
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '5px' }}>
              4. THE 6 PUNCHES:
            </h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
              One Jab, one cross, two hooks and two body shots. That’s it.
            </p>
          </div>
        </div>

        {/* CTA Button using the .btn.outline class from home.css */}
        <div style={{ marginTop: '50px' }}>
          <Link href="/workout/videos">
            <button className="btn outline">
              FOR IN-DEPTH GUIDE
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EssentialsSection;