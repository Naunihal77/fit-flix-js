import HomeDropdown from "@/components/HomeDropdown";
import GymsDropdown from "@/components/GymsDropdown";
import ProgramsDropdown from "@/components/ProgramsDropdown";
import PricingDropdown from "@/components/PricingDropdown";
import ContactDropdown from "@/components/ContactDropdown";

/* inside the header's nav area -> REPLACE previous <nav> ... </nav> with: */

<nav className="nav" role="navigation" aria-label="Primary">
  <ul className="nav-list">
    <li><HomeDropdown /></li>
    <li><GymsDropdown /></li>
    <li><ProgramsDropdown /></li>
    <li><PricingDropdown /></li>
    <li><ContactDropdown /></li>
  </ul>
</nav>
