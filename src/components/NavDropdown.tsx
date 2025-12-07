"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface DropdownItem {
  label: string;
  href?: string;
  description?: string;
  onClick?: () => void;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  id?: string;
}

export default function NavDropdown({ label, items, id }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const btnId = id ? `${id}-btn` : undefined;
  const menuId = id ? `${id}-menu` : undefined;

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // keyboard: open with ArrowDown, close with ArrowUp/Esc
  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      const first = ref.current?.querySelector<HTMLAnchorElement>("a, button");
      first?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className="nav-dropdown" ref={ref}>
      <button
        id={btnId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className="nav-button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        type="button"
      >
        {label}
        <span className="chev" aria-hidden>▾</span>
      </button>

      {open && (
        <div role="menu" id={menuId} className="nav-menu" aria-labelledby={btnId}>
          <ul>
            {items.map((it, idx) => (
              <li key={idx} role="none">
                {it.href ? (
                  <Link href={it.href} role="menuitem" tabIndex={0} className="nav-menu-item">
                    <span className="nav-menu-title">{it.label}</span>
                    {it.description && <span className="nav-menu-desc">{it.description}</span>}
                  </Link>
                ) : (
                  <button
                    role="menuitem"
                    tabIndex={0}
                    className="nav-menu-item"
                    onClick={() => {
                      it.onClick?.();
                      setOpen(false);
                    }}
                  >
                    <span className="nav-menu-title">{it.label}</span>
                    {it.description && <span className="nav-menu-desc">{it.description}</span>}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
