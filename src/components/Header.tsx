"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// --- 1. NAVIGATION DATA ---
const GYMS_ITEMS = [
  { label: "About Gyms", href: "/gyms" },
  { label: "Browse Gyms", href: "/browsegyms" },
  { label: "Electronic City", href: "/OwndedGym1" },
  { label: "Marathahalli", href: "/OwndedGym2" },
  { label: "Brookefield", href: "/OwndedGym3" },
];

const PROGRAMS_ITEMS = [
  { label: "Workout", href: "/workout" },
  { label: "Events", href: "/events" },
  { label: "Strength & Conditioning", href: "/programs/strength" },
  { label: "Kickboxing", href: "/programs/kickboxing" },
  { label: "Mobility & Recovery", href: "/programs/mobility" },
];

const PRICING_ITEMS = [
  { label: "Memberships", href: "/pricing/memberships" },
  { label: "Class Packs", href: "/pricing/class-packs" },
  { label: "Corporate", href: "/pricing/corporate" },
];

const CONTACT_ITEMS = [
  { label: "Contact Us", href: "/contact" },
  { label: "Support", href: "/support" },
  { label: "Franchise Enquiries", href: "/franchise" },
];

// --- 2. MAIN HEADER COMPONENT ---
export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        
        {/* LOGO SECTION - Using your png from public/images/icon.png */}
        <Link href="/" className="logo">
          <div className="logo-icon-wrapper">
            <Image 
              src="/images/icon.png" 
              alt="Fit-Flix Logo" 
              width={40} 
              height={40} 
              priority
              className="logo-img"
            />
          </div>
          <span className="logo-text">FIT-FLIX</span>
        </Link>
        
        {/* MAIN NAVIGATION */}
        <nav className="nav">
          <ul>
            <li><Link href="/">HOME</Link></li>
            <li><NavDropdown label="GYMS" items={GYMS_ITEMS} /></li> 
            <li><NavDropdown label="PROGRAMS" items={PROGRAMS_ITEMS} /></li> 
            <li><NavDropdown label="PRICING" items={PRICING_ITEMS} /></li>
            <li><NavDropdown label="CONTACT" items={CONTACT_ITEMS} /></li>
          </ul>
        </nav>
        
        {/* ACTIONS */}
        <div className="header-actions">
          <button className="btn outline">SCHEDULE</button>
          <button className="btn solid">CREATE AN ACCOUNT</button>
        </div>
      </div>
    </header>
  );
}

// --- 3. REUSABLE DROPDOWN COMPONENT ---
function NavDropdown({ label, items }: { label: string, items: {label: string, href: string}[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <button 
        className="dropdown-btn" 
        onClick={() => setOpen(!open)} 
        type="button"
        style={{ color: open ? 'var(--gold)' : 'inherit' }}
      >
        {label} ▾
      </button>
      {open && (
        <ul className="dropdown-menu">
          {items.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="dropdown-item" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}