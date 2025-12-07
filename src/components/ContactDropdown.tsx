import React from "react";
import NavDropdown from "./NavDropdown";

export default function ContactDropdown() {
  const items = [
    { label: "Contact Us", href: "/contact" },
    { label: "Support", href: "/support" },
    { label: "Franchise Enquiries", href: "/franchise" },
  ];
  return <NavDropdown label="CONTACT" items={items} id="contact" />;
}
