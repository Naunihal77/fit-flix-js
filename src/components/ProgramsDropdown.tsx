import React from "react";
import NavDropdown from "./NavDropdown";

export default function ProgramsDropdown() {
  const items = [
    { label: "Group Classes", href: "/programs/group-classes", description: "Boxing, HIIT, Yoga" },
    { label: "1:1 Coaching", href: "/programs/coaching", description: "Personal trainers" },
    { label: "Online Plans", href: "/programs/online", description: "Train anywhere" },
  ];
  return <NavDropdown label="PROGRAMS" items={items} id="programs" />;
}
