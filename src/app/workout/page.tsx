import React from 'react';
import Link from 'next/link';

export default function WorkoutPage() {
  return (
    <div className="workout-page-wrapper">
      {/* SECTION 1: HERO */}
      <section className="workout-hero">
        <div className="container">
          <h1>Seamlessly integrate your gym workouts with our <span>Digital Programs</span></h1>
          <p>Guided classes and personalized tracking tools to help you reach your goals faster.</p>
          <div className="hero-ctas">
            <button className="btn solid">GET THE WORKOUT APP</button>
            <button className="btn outline">START FREE TRIAL</button>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHYSICAL TRAINING PROGRAMS */}
      <section className="programs-grid-section">
        <div className="container">
          <h2 className="section-title">Comprehensive Fitness Programs</h2>
          <div className="programs-grid">
            {[
              { title: "Strength Training", desc: "Build muscle, increase strength, and transform your physique." },
              { title: "Cardio & HIIT", desc: "Burn fat, boost endurance, and improve cardiovascular health." },
              { title: "Group Fitness", desc: "Join energizing classes including Yoga, Zumba, CrossFit, and more." },
              { title: "Personal Training", desc: "One-on-one coaching with certified trainers for personalized results." }
            ].map((prog, i) => (
              <div key={i} className="program-card">
                <div className="card-icon">💪</div>
                <h3>{prog.title}</h3>
                <p>{prog.desc}</p>
                <Link href="#" className="view-link">VIEW DETAILS →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: THE APP (GO DIGITAL) */}
      <section className="app-feature-section">
        <div className="container">
          <div className="app-content">
            <span className="badge-small">GO DIGITAL</span>
            <h2>The Fit-Flix App: Your Pocket Personal Trainer</h2>
            <div className="features-list">
              <div className="f-item">
                <h4>1000+ Minutes of Content</h4>
                <p>Full library of on-demand classes from Yoga to advanced HIIT led by certified trainers.</p>
              </div>
              <div className="f-item">
                <h4>Progress Tracking & Analytics</h4>
                <p>Monitor your performance, set goals, and view detailed metrics to stay motivated.</p>
              </div>
              <div className="f-item">
                <h4>Community Challenges</h4>
                <p>Join fitness challenges and connect with the Fit-Flix community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}