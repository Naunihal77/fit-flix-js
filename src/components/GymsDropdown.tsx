"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
// We don't need to import the CSS module, but we reference the global classes.

const ITEMS = [
  { label: "About Gyms", href: "/gyms" },
  { label: "Browse Gyms", href: "/browsegyms" },
  { label: "Electronic City", href: "/OwndedGym1" },
  { label: "Marathahalli", href: "/OwndedGym2" },
  { label: "Brookefield", href: "/OwndedGym3" },
  { label: "Open a Gym", href: "/partner" },
];

export default function GymsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      // Check if the ref is current and if the click is outside the dropdown container
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // Attach event listener to the document
    document.addEventListener("click", onDoc);
    
    // Cleanup function
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    // The main container div uses the 'dropdown' class defined in home.css
    // We also use 'nav-list > li' styling via an inline style wrapper for proper positioning within the header ul
    <div className="dropdown" ref={ref} style={{ position: 'relative' }}> 
      <button 
        className="dropdown-btn" 
        onClick={() => setOpen(!open)} 
        type="button"
        // Apply active/open styling via inline style for immediate feedback
        style={{ color: open ? '#D4A017' : 'inherit' }}
      >
        GYMS ▾
      </button>
      {open && (
        <ul className="dropdown-menu" role="menu">
          {ITEMS.map(i => (
            <li key={i.href}>
              <Link 
                href={i.href} 
                className="dropdown-item" 
                onClick={() => setOpen(false)} // Close dropdown on link click
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}