import React from "react";
import NavDropdown from "./NavDropdown";

export default function GymsDropdown() {
  const items = [
    { label: "Discover Gyms", href: "/gyms" },
    { label: "Near Me", href: "/gyms/near-me" },
    { label: "Gym Details", href: "/gyms/sample-gym" },
    { label: "Open a Gym", href: "/partner" },
  ];
  return <NavDropdown label="GYM'S" items={items} id="gyms" />;
}
