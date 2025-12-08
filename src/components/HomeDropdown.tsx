"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ITEMS = [
  { label: "Overview", href: "/" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
];

export default function HomeDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <button className="dropdown-btn" onClick={() => setOpen(!open)} type="button">
        HOME ▾
      </button>
      {open && (
        <ul className="dropdown-menu" role="menu">
          {ITEMS.map(i => (
            <li key={i.href}><Link href={i.href} className="dropdown-item" onClick={() => setOpen(false)}>{i.label}</Link></li>
          ))}
        </ul>
      )}
    </div>
  );
}
