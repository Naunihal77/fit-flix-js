import React from "react";
import NavDropdown from "./NavDropdown";

export default function HomeDropdown() {
  const items = [
    { label: "Overview", href: "/" },
    { label: "News & Updates", href: "/news" },
    { label: "Careers", href: "/careers" },
  ];
  return <NavDropdown label="HOME" items={items} id="home" />;
}
