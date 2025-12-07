"use client";

import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <header className="tribe-header">
        <div className="tribe-header-inner">
          <div className="tribe-logo">
            <div className="logo-graphic" />
            <div className="logo-text">TRIBE</div>
          </div>

          <nav className="tribe-nav">
            <ul>
              <li><Link href="#">HOME</Link></li>
              <li><Link href="#">WORKOUT</Link></li>
              <li><Link href="#">PACKAGES</Link></li>
              <li><Link href="#">THE TEAM</Link></li>
              <li><Link href="#">EVENTS</Link></li>
              <li><Link href="#">MERCHANDISE</Link></li>
            </ul>
          </nav>

          <div className="tribe-actions">
            <button className="btn btn-schedule">SCHEDULE</button>
            <button className="btn btn-create">CREATE AN ACCOUNT</button>
          </div>
        </div>
      </header>

      <section className="tribe-hero video-background-container">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay">
          <div className="badge">
            Best Studio
            <small>BEST OF CLASSPASS 2024</small>
          </div>

          <h1 className="hero-title">FIND YOUR TRIBE</h1>
          <h2 className="hero-sub">COME FOR THE WORKOUT, STAY FOR THE COMMUNITY.</h2>

          <p className="hero-desc">
            Where you can <strong>SWEAT</strong> in a safe space, alongside our vibrant TRIBE community.
            Immerse yourself in an unparalleled fitness experience like no other. <em>#FINDYOURTRIBE</em>
          </p>

          <div className="hero-ctas">
            <button className="btn btn-book">BOOK A CLASS</button>
            <button className="btn btn-trial">GET YOUR 3-CLASS TRIAL COMBO FOR RM90.00</button>
          </div>
        </div>
      </section>

      <section className="why-tribe">
        <div className="why-inner">
          <div className="tribe-image">
            <img src="/images/group-photo.jpg" alt="TRIBE Community Group Photo" />
          </div>

          <div className="tribe-text">
            <h2>WHY TRIBE?</h2>

            <div className="feature">
              <span className="icon">✨</span>
              <div className="feature-body">
                <p className="feature-title"><strong>FIND YOUR BEST SELF</strong></p>
                <p>In a safe space with no judgements & no labels, the workout experience is all about you and no one else - where you can push yourself to new heights.</p>
              </div>
            </div>

            <div className="feature">
              <span className="icon">🏠</span>
              <div className="feature-body">
                <p className="feature-title"><strong>YOUR TRIBE, YOUR HOME</strong></p>
                <p>Celebrate every milestone with your newfound family of TRIBERs - our warm community fosters support & understanding that makes our studios more than just a place to sweat, but a space to connect.</p>
              </div>
            </div>

            <div className="feature">
              <span className="icon">🎶</span>
              <div className="feature-body">
                <p className="feature-title"><strong>ON THE BEAT</strong></p>
                <p>Our instructors carefully curate their unique playlists to hit every beat, ensuring a top notch rhythmic workout experience like no other.</p>
              </div>
            </div>

            <button className="btn btn-first">TRY YOUR FIRST CLASS</button>
          </div>
        </div>
      </section>

      <section className="workouts">
        <div className="workouts-header">
          <h2>THE WORKOUTS</h2>
          <p className="muted">Elevate your fitness journey with our diverse class offerings! With the heart-pounding intensity of <strong>BOXING</strong>, find your rhythm as you <strong>SWEAT TO THE BEAT</strong>.</p>
        </div>

        <div className="workout-images">
          <div className="col"><img src="/images/boxing.jpg" alt="Woman boxing in studio" /></div>
          <div className="col"><img src="/images/medball.jpg" alt="Women training with medicine balls" /></div>
          <div className="col"><img src="/images/lifting.jpg" alt="Man lifting weights" /></div>
        </div>
      </section>

      <div className="training-ticker">
        <p>• BOXING • TRAINING • BOXING • TRAINING • BOXING • TRAINING • BOXING • TRAINING •</p>
      </div>

      <section className="community">
        <div className="community-inner">
          <div className="community-header">
            <h3>OUR COMMUNITY, YOUR TRIBE</h3>
            <p>From the moment you step into our doors, you are a significant part of our <strong>TRIBE</strong> - our close-knit community of TRIBERs who grow, encourage & support each other every step of the way.</p>
          </div>

          <div className="testimonials">
            <article className="testimonial">
              <div className="reviewer"><span className="avatar">Y</span><div><h4>Yishai Thillinadan</h4><div className="rating">⭐⭐⭐⭐⭐</div></div></div>
              <p>As a person who doesn't work out and was basically dragged there I can vouch that this is amazing and you won't regret it :)</p>
            </article>

            <article className="testimonial">
              <div className="reviewer"><span className="avatar">Y</span><div><h4>Yen Li</h4><div className="rating">⭐⭐⭐⭐⭐</div></div></div>
              <p>My absolute favorite studio to go for boxing! Been to many different studios for boxing and I can swear by Tribe, I've never had a bad class from them and all the instructors I've tried out are really good. Good facilities as well :)</p>
            </article>

            <article className="testimonial">
              <div className="reviewer"><span className="avatar">A</span><div><h4>Anith Zasha</h4><div className="rating">⭐⭐⭐⭐⭐</div></div></div>
              <p>One thing that differentiate Tribe from other fitness studios would definitely be their hospitality. Surrounded by friendly people, from their front desk to their instructors.</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="tribe-footer">
        <p>TRIBE Fitness Studio &copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
