import React from 'react';

const GYMS = [
  {
    id: 1,
    name: "FitFlix Premium Gym - Electronic City",
    location: "Electronic City, Bangalore",
    rating: 4.8,
    type: "Gym",
    image: "/gym1.jpg", // Replace with your actual image paths
    description: "State-of-the-art gym with modern equipment, personal training, and group classes.",
    tags: ["Cardio", "Strength Training", "Personal Training", "Group Classes", "Locker Rooms"],
    timing: "06:00 AM - 10:00 PM"
  },
  {
    id: 2,
    name: "FitFlix Wellness Club - Marathahalli",
    location: "Marathahalli, Bangalore",
    rating: 4.7,
    type: "Wellness Club",
    image: "/gym2.jpg",
    description: "Premium wellness center with therapy, recovery, and holistic fitness programs.",
    tags: ["Cryotherapy", "Massage Therapy", "Yoga", "Meditation", "Nutrition Counseling"],
    timing: "07:00 AM - 09:00 PM"
  }
];

export default function BrowseGyms() {
  return (
    <main className="browse-gyms-page">
      <div className="container">
        <header className="page-header">
          <h1>Discover Your <span>Perfect Gym</span></h1>
          <div className="search-container">
            <input type="text" placeholder="Search gyms and wellness clubs..." className="search-input" />
            <button className="btn solid">SEARCH</button>
          </div>
          <p className="results-count">{GYMS.length} facilities found</p>
        </header>

        <section className="gym-list">
          {GYMS.map((gym) => (
            <div key={gym.id} className="gym-card">
              <div className="gym-card-image">
                <img src={gym.image} alt={gym.name} />
                <span className="badge-type">{gym.type}</span>
              </div>
              
              <div className="gym-card-content">
                <div className="gym-header">
                  <span className="verified-tag">✓ Verified</span>
                  <h3>{gym.name}</h3>
                  <p className="location-text">📍 {gym.location}</p>
                </div>

                <div className="rating-row">
                  <span className="star">★</span> {gym.rating}
                </div>

                <p className="gym-description">{gym.description}</p>

                <div className="tag-container">
                  {gym.tags.map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>

                <div className="gym-footer">
                  <span className="timing">🕒 {gym.timing}</span>
                  <div className="action-group">
                    <button className="btn outline">VIEW DETAILS</button>
                    <button className="btn solid">GET CALLBACK</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}