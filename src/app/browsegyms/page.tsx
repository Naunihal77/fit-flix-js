// src/app/browsegyms/page.tsx
import React from "react";
import Link from "next/link";

export default function BrowseGymsPage(): JSX.Element {
  return (
    <main style={{ minHeight: "100vh", background: "var(--black)", paddingTop: "80px" }}>
      
      {/* PAGE HEADER */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "var(--white)" }}>
          Browse <span className="accent">Gyms</span>
        </h1>
        <p style={{ maxWidth: "700px", margin: "12px auto", color: "rgba(255,255,255,0.7)" }}>
          Explore Fit-Flix gyms near you. Premium facilities, expert trainers, and flexible memberships.
        </p>
      </section>

      {/* GYM LIST */}
      <section className="container" style={{ paddingBottom: "80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Electronic City */}
          <div className="gym-card">
            <h3>Electronic City</h3>
            <p>Phase 1, Bengaluru</p>

            <div className="tags">
              <span>24x7</span>
              <span>Personal Training</span>
              <span>Group Classes</span>
            </div>

            <Link href="/gyms/electronic-city">
              <button className="btn solid small">View Details →</button>
            </Link>
          </div>

          {/* Marathahalli */}
          <div className="gym-card">
            <h3>Marathahalli</h3>
            <p>Kishan Icon, Bengaluru</p>

            <div className="tags">
              <span>Cardio Zone</span>
              <span>Strength Training</span>
              <span>Trainers</span>
            </div>

            <Link href="/gyms/marathahalli">
              <button className="btn solid small">View Details →</button>
            </Link>
          </div>

          {/* Brookefield */}
          <div className="gym-card">
            <h3>Brookefield</h3>
            <p>Above Showroom, Bengaluru</p>

            <div className="tags">
              <span>Premium Equipment</span>
              <span>Boxing</span>
              <span>HIIT</span>
            </div>

            <Link href="/gyms/brookefield">
              <button className="btn solid small">View Details →</button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#070707", padding: "70px 20px", textAlign: "center" }}>
        <h2 style={{ color: "var(--white)", fontWeight: 900 }}>
          Can’t decide? <span className="accent">Visit us</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", margin: "12px 0 24px" }}>
          Get a free walkthrough and find the gym that fits your lifestyle.
        </p>
        <Link href="/contact">
          <button className="btn solid large">Book a Visit</button>
        </Link>
      </section>
    </main>
  );
}
