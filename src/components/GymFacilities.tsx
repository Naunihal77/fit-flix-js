// src/components/GymFacilities.tsx
import React from 'react';

interface FacilityCardProps {
  icon: string; // Placeholder for an emoji or icon component
  title: string;
  description: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ icon, title, description }) => (
  // Card styling derived from surrounding sections in images
  <div style={{
    background: '#151515', // Dark background for the card
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '50%', 
        background: 'var(--orange)', // Accent color for the icon background
        color: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
      }}>{icon}</div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--white)' }}>{title}</h3>
    </div>
    <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '5px' }}>
      {description}
    </p>
  </div>
);

const GymFacilities: React.FC = () => {
  return (
    <section style={{ padding: '80px 0', background: 'var(--black)' }}>
      <div className="container">
        
        {/* Header/Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ 
            color: 'var(--orange)', 
            fontWeight: '700', 
            fontSize: '0.9rem',
            marginBottom: '10px',
            display: 'inline-block',
            border: '1px solid var(--orange)',
            padding: '4px 10px',
            borderRadius: '50px'
          }}>Why Choose Fitflix Gyms</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--white)', marginTop: '5px' }}>
            Premium Facilities & Services
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: '5px' }}>
            Everything you need to achieve your fitness goals in one place
          </p>
        </div>

        {/* 3x2 Grid of Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          
          <FacilityCard 
            icon="🛠️"
            title="State-of-the-Art Equipment"
            description="Latest fitness machines and free weights from leading brands for optimal training."
          />
          
          <FacilityCard 
            icon="🎓"
            title="Certified Trainers"
            description="Expert guidance from certified professionals dedicated to your fitness goals."
          />
          
          <FacilityCard 
            icon="👯"
            title="Group Classes"
            description="Dynamic group sessions including HIIT, Yoga, Zumba, and specialized training."
          />

          <FacilityCard 
            icon="⏰"
            title="Flexible Timings"
            description="Early morning to late night access to fit your busy schedule."
          />

          <FacilityCard 
            icon="📍"
            title="Prime Locations"
            description="Conveniently located in Electronic City, Marathahalli, and Brookefield."
          />

          <FacilityCard 
            icon="🎯"
            title="Personalized Programs"
            description="Customized workout plans tailored to your fitness level and goals."
          />

        </div>
      </div>
    </section>
  );
};

export default GymFacilities;