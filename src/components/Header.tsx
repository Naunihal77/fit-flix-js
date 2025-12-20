"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// --- 1. Dropdown Item Lists ---
// Keeping GYMS_ITEMS for your vertical dropdown
const GYMS_ITEMS = [
  { label: "About Gyms", href: "/gyms" },
  { label: "Browse Gyms", href: "/browsegyms" },
  { label: "Electronic City", href: "/OwndedGym1" },
  { label: "Marathahalli", href: "/OwndedGym2" },
  { label: "Brookefield", href: "/OwndedGym3" },
  { label: "Open a Gym", href: "/partner" },
];

// --- 2. Generic Dropdown Component (Reusable) ---
interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <div className="dropdown" ref={ref} style={{ position: 'relative' }}>
      <button
        className="dropdown-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        type="button"
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
          <div className="logo-icon" style={{ background: 'var(--gold)' }}></div> 
          <span className="logo-text">FIT-FLIX</span>
        </div>
        
        {/* Navigation Section - UPDATED TO ONLY 5 ITEMS */}
        <nav className="nav">
          <ul>
            <li><Link href="/">HOME</Link></li>
            
            {/* GYMS Dropdown kept as per previous requirements */}
            <li><Dropdown label="Gyms" items={GYMS_ITEMS} /></li> 
            
            {/* Standard Links for the new requested categories */}
            <li><Link href="/program">PROGRAM</Link></li>
            <li><Link href="/pricing">PRICING</Link></li>
            <li><Link href="/contact">CONTACT</Link></li>
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