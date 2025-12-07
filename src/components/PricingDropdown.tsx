import React from "react";
import NavDropdown from "./NavDropdown";

export default function PricingDropdown() {
  const items = [
    { label: "Memberships", href: "/pricing/memberships", description: "Monthly & Annual" },
    { label: "Class Packs", href: "/pricing/class-packs", description: "Flexible packs" },
    { label: "Corporate", href: "/pricing/corporate", description: "Team plans" },
  ];
  return <NavDropdown label="PRICING" items={items} id="pricing" />;
}
