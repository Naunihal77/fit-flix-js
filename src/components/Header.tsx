"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// --- 1. Dropdown Item Lists ---

const GYMS_ITEMS = [
  { label: "About Gyms", href: "/gyms" },
  { label: "Browse Gyms", href: "/browsegyms" },
  { label: "Electronic City", href: "/OwndedGym1" },
  { label: "Marathahalli", href: "/OwndedGym2" },
  { label: "Brookefield", href: "/OwndedGym3" },
  { label: "Open a Gym", href: "/partner" },
];

const WORKOUTS_ITEMS = [
  { label: "BOXING", href: "/workout/boxing" },
  { label: "Events", href: "/workout/hiit" },
  { label: "YOGA", href: "/workout/yoga" },
  { label: "STRENGTH & CONDITIONING", href: "/workout/strength" },
];

// --- 2. Generic Dropdown Component (Reusable) ---

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Function to close the dropdown when clicking anywhere outside of it
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // Function to close dropdown on link click
  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    // Uses classes from home.css: dropdown, dropdown-btn, dropdown-menu, dropdown-item
    <div className="dropdown" ref={ref} style={{ position: 'relative' }}>
      <button
        className="dropdown-btn"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the document listener from closing immediately
          setOpen(!open);
        }}
        type="button"
        // Use the CSS variable from home.css for the gold accent color
        style={{ color: open ? 'var(--gold)' : 'inherit' }}
      >
        {label.toUpperCase()} ▾
      </button>
      {open && (
        <ul className="dropdown-menu" role="menu">
          {items.map(i => (
            <li key={i.href}>
              <Link
                href={i.href}
                className="dropdown-item"
                onClick={handleItemClick}
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- 3. Main Header Component ---

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container header-inner">
        
        {/* Logo Section */}
        <div className="logo">
          {/* Logo icon placeholder */}
          <div className="logo-icon" style={{ background: 'var(--gold)' }}></div> 
          <span className="logo-text">FIT-FLIX</span>
        </div>
        
        {/* Navigation Section */}
        <nav className="nav">
          <ul>
            <li><Link href="/">HOME</Link></li>
            
            {/* Modular Dropdown Components using the generic Dropdown component */}
            <li><Dropdown label="Gyms" items={GYMS_ITEMS} /></li> 
            <li><Dropdown label="Workout" items={WORKOUTS_ITEMS} /></li>
            
            {/* Standard Nav Links */}
            <li><Link href="/packages">PACKAGES</Link></li>
            <li><Link href="/team">STREAMERS</Link></li>
            <li><Link href="/events">EVENTS</Link></li>
            <li><Link href="/merchandise">MERCHANDISE</Link></li>
          </ul>
        </nav>
        
        {/* Action Buttons */}
        <div className="header-actions">
          <button className="btn outline">SCHEDULE</button>
          <button className="btn solid">CREATE AN ACCOUNT</button>
        </div>
      </div>
    </header>
  );
};

export default Header;