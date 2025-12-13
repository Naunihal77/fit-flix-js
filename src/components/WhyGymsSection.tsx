// src/components/WhyGymsSection.tsx
import React from 'react';
import Link from 'next/link';

interface FeatureProps {
  icon: string; // Placeholder for emoji or icon character
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="feature">
    <div className="icon" style={{ color: 'var(--gold)' }}>{icon}</div>
    <div className="body">
      <h4 style={{ color: 'var(--white)', fontWeight: '800', fontSize: '1.1rem' }}>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

const WhyGymsSection: React.FC = () => {
  return (
    <section className="why">
      <div className="container why-inner" style={{ flexDirection: 'row' }}>
        
        {/* Left Column: Image/Visual (Placeholder) */}
        <div className="why-image" style={{ flex: '1 1 50%' }}>
          {/* You would replace this with an actual image component */}
          <div style={{ height: '400px', background: 'linear-gradient(135deg, var(--gold), var(--orange))', borderRadius: '10px' }}>
            {/*  */}
            <p style={{ padding: '20px', color: 'var(--black)', fontWeight: '900' }}>[Placeholder for Gym Interior Image]</p>
          </div>
        </div>
        
        {/* Right Column: Text and Features */}
        <div className="why-text" style={{ flex: '1 1 50%', paddingLeft: '30px' }}>
          
          <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--white)', marginBottom: '8px' }}>
            FIND YOUR <span className="accent">TRIBE</span>
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '25px', fontSize: '1rem' }}>
            We're more than just a gym. We are a community built around high energy, quality coaching, and state-of-the-art facilities across the city.
          </p>
          
          <Feature
            icon="⚡"
            title="HIGH-ENERGY ATMOSPHERE"
            description="Our classes are designed to be an experience, blending motivating music with synchronized lights to push your limits."
          />
          
          <Feature
            icon="🏅"
            title="CERTIFIED COACHES"
            description="Learn from the best. Our trainers are certified experts focused on form, safety, and results."
          />
          
          <Feature
            icon="🏆"
            title="PREMIUM FACILITIES"
            description="Access cutting-edge equipment, pristine locker rooms, and luxury amenities at all our locations."
          />

          <Link href="/browsegyms">
            <button className="btn solid" style={{ marginTop: '20px' }}>
              BROWSE ALL LOCATIONS
            </button>
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default WhyGymsSection;