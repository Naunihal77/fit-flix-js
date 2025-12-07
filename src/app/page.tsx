"use client";

import React from "react";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon" aria-hidden />
            <span className="logo-text">FIT-FLIX</span>
          </div>

          <nav className="nav" role="navigation" aria-label="Primary">
            <ul>
              <li><Link href="#">HOME</Link></li>
              <li><Link href="#">Gym's</Link></li>
              <li><Link href="#">PROGRAMS</Link></li>
              <li><Link href="#">PRICING</Link></li>
              <li><Link href="#">CONTACT</Link></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="btn outline">SCHEDULE</button>
            <button className="btn solid">JOIN</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        {/* background video */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay">
          <div className="badge">Fit-Flix</div>

          <h1 className="hero-title">TRAIN. HEAL. GROW.</h1>
          <p className="hero-sub">India's Premier Fitness & Wellness Ecosystem </p>

          <p className="hero-desc">
            Interested in gym membership, training plans and group classes? Join Fit-Flix
            and we’ll call you back to get you started.
          </p>

          <div className="hero-ctas">
            <button className="btn action">Request Callback</button>
            <button className="btn secondary">View Plans</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Where will you start your <span className="accent">Fit-Flix</span> journey?</h2>
        </div>
      </section>

      {/* PREVIEW / GALLERY */}
      <section className="preview">
        <div className="container preview-inner">
          <div className="preview-image">
            <img src="/images/bottom-image.jpg" alt="Fit-Flix preview" />
            <span className="preview-logo">Fit-Flix</span>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="container why-inner">
          <div className="why-image">
            <img src="/images/group-photo.jpg" alt="Community" />
          </div>

          <div className="why-text">
            <h3>WHY FIT-FLIX?</h3>

            <div className="feature">
              <div className="icon">💪</div>
              <div className="body">
                <strong>Personal growth</strong>
                <p>Structured plans and coaches that help you progress week-by-week.</p>
              </div>
            </div>

            <div className="feature">
              <div className="icon">🏠</div>
              <div className="body">
                <strong>Community</strong>
                <p>Friendly members, group classes and local meetups — your new tribe.</p>
              </div>
            </div>

            <div className="feature">
              <div className="icon">🎯</div>
              <div className="body">
                <strong>Results</strong>
                <p>Clear milestones, tracked progress, and trainer-led coaching.</p>
              </div>
            </div>

            <button className="btn solid">Try Your First Class</button>
          </div>
        </div>
      </section>

      {/* WORKOUTS */}
      <section className="workouts">
        <div className="container">
          <h3>THE WORKOUTS</h3>

          <div className="workout-grid">
            <div className="witem"><img src="/images/boxing.jpg" alt="Boxing" /></div>
            <div className="witem"><img src="/images/medball.jpg" alt="Medicine ball" /></div>
            <div className="witem"><img src="/images/lifting.jpg" alt="Strength" /></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="community">
        <div className="container">
          <h3>OUR COMMUNITY</h3>

          <div className="testimonials">
            <blockquote className="card">
              <div className="avatar">Y</div>
              <p className="quote">Amazing place — instructors actually care. Highly recommend.</p>
              <cite>— Yishai</cite>
            </blockquote>

            <blockquote className="card">
              <div className="avatar">L</div>
              <p className="quote">Best boxing classes I've taken.</p>
              <cite>— Yen Li</cite>
            </blockquote>

            <blockquote className="card">
              <div className="avatar">A</div>
              <p className="quote">Warm community and great coaching for all levels.</p>
              <cite>— Anith</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <p>Fit-Flix © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
