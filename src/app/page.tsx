"use client";

import React from "react";
import Link from "next/link";
import HomeDropdown from "@/components/HomeDropdown";
import GymsDropdown from "@/components/GymsDropdown";
import ProgramsDropdown from "@/components/ProgramsDropdown";
import PricingDropdown from "@/components/PricingDropdown";
import ContactDropdown from "@/components/ContactDropdown";

export default function Page(): JSX.Element {
  return (
    <>
      {/* Header / Top Nav */}
      <header className="header" role="banner">
        <div className="container header-inner">
          <div className="logo" aria-hidden>
            <div className="logo-icon" />
            <span className="logo-text">FIT-FLIX</span>
          </div>

          <nav className="nav" role="navigation" aria-label="Primary">
            <ul className="nav-list">
              <li>
                <HomeDropdown />
              </li>
              <li>
                <GymsDropdown />
              </li>
              <li>
                <ProgramsDropdown />
              </li>
              <li>
                <PricingDropdown />
              </li>
              <li>
                <ContactDropdown />
              </li>
            </ul>
          </nav>

          <div className="header-actions" role="region" aria-label="Header actions">
            <button className="btn outline">SCHEDULE</button>
            <button className="btn solid">JOIN</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" aria-label="Intro">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          {/* fallback text omitted intentionally */}
        </video>

        <div className="hero-overlay">
          <div className="badge">Fit-Flix</div>

          <h1 className="hero-title">FIND THE REAL U</h1>
          <p className="hero-sub">
            THE LONG GAME <span className="only">Only</span>
          </p>

          <p className="hero-desc">
            Interested in gym membership, training plans and group classes? Join Fit-Flix and we’ll
            call you back to get you started.
          </p>

          <div className="hero-ctas">
            <button className="btn action" aria-label="Request callback">
              Request Callback
            </button>
            <button className="btn secondary" aria-label="View plans">
              View Plans
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">
            Where will you start your <span className="accent">Fit-Flix</span> journey?
          </h2>
        </div>
      </section>

      {/* PREVIEW / GALLERY */}
      <section className="preview" aria-label="Preview">
        <div className="container preview-inner">
          <div className="preview-image" role="img" aria-label="Preview image">
            <img src="/images/bottom-image.jpg" alt="Fit-Flix preview" />
            <span className="preview-logo">Fit-Flix</span>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why" aria-labelledby="why-heading">
        <div className="container why-inner">
          <div className="why-image">
            <img src="/images/group-photo.jpg" alt="Community" />
          </div>

          <div className="why-text">
            <h3 id="why-heading">WHY FIT-FLIX?</h3>

            <div className="feature">
              <div className="icon" aria-hidden>
                💪
              </div>
              <div className="body">
                <strong>Personal growth</strong>
                <p>Structured plans and coaches that help you progress week-by-week.</p>
              </div>
            </div>

            <div className="feature">
              <div className="icon" aria-hidden>
                🏠
              </div>
              <div className="body">
                <strong>Community</strong>
                <p>Friendly members, group classes and local meetups — your new tribe.</p>
              </div>
            </div>

            <div className="feature">
              <div className="icon" aria-hidden>
                🎯
              </div>
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
      <section className="workouts" aria-labelledby="workouts-heading">
        <div className="container">
          <h3 id="workouts-heading">THE WORKOUTS</h3>

          <div className="workout-grid" role="list">
            <div className="witem" role="listitem">
              <img src="/images/boxing.jpg" alt="Boxing class" />
            </div>
            <div className="witem" role="listitem">
              <img src="/images/medball.jpg" alt="Medicine ball training" />
            </div>
            <div className="witem" role="listitem">
              <img src="/images/lifting.jpg" alt="Strength training" />
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY / TESTIMONIALS */}
      <section className="community" aria-labelledby="community-heading">
        <div className="container">
          <h3 id="community-heading">OUR COMMUNITY</h3>

          <div className="testimonials" role="list">
            <article className="card" role="listitem">
              <div className="avatar">Y</div>
              <p className="quote">Amazing place — instructors actually care. Highly recommend.</p>
              <cite>— Yishai</cite>
            </article>

            <article className="card" role="listitem">
              <div className="avatar">L</div>
              <p className="quote">Best boxing classes I've taken.</p>
              <cite>— Yen Li</cite>
            </article>

            <article className="card" role="listitem">
              <div className="avatar">A</div>
              <p className="quote">Warm community and great coaching for all levels.</p>
              <cite>— Anith</cite>
            </article>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <p>Fit-Flix © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
