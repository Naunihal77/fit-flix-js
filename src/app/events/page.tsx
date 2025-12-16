// src/app/events/page.tsx
import React from "react";
import Link from "next/link";

const EVENTS = [
  {
    title: "Fit-Flix Boxing Challenge",
    date: "30 March 2025",
    location: "Electronic City",
    labels: ["BOXING", "GROUP", "CHALLENGE"],
  },
  {
    title: "Strength & Conditioning Camp",
    date: "12 April 2025",
    location: "Marathahalli",
    labels: ["STRENGTH", "HIIT"],
  },
  {
    title: "Mobility & Recovery Workshop",
    date: "20 April 2025",
    location: "Brookefield",
    labels: ["RECOVERY", "WORKSHOP"],
  },
];

export default function EventsPage(): JSX.Element {
  return (
    <main className="events-page">
      {/* Hero */}
      <section className="events-hero">
        <h1>
          FIT-FLIX <span>EVENTS</span>
        </h1>
        <p>
          Train together. Compete together. Grow together.
        </p>
      </section>

      {/* Events List */}
      <section className="events-list">
        {EVENTS.map((event, index) => (
          <Link href={`/events/${index + 1}`} key={index}>
            <div className="event-card">
              <h3>{event.title}</h3>

              <p className="event-meta">
                📍 {event.location} &nbsp;•&nbsp; 📅 {event.date}
              </p>

              <div className="event-labels">
                {event.labels.map((label, i) => (
                  <span key={i} className="event-label">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="events-cta">
        <h2>READY TO JOIN AN EVENT?</h2>
        <Link href="/contact">
          <button className="btn solid">CONTACT US</button>
        </Link>
      </section>
    </main>
  );
}
