"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

const LABEL_MAP: Record<string, string> = {
  "discover-gym": "Discover Gyms",
  gym: "Gym Details",
  about: "About Us",
  sitemap: "Sitemap",
  services: "Services",
};

const formatLabel = (segment: string) => {
  if (LABEL_MAP[segment]) return LABEL_MAP[segment];
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
};

const Breadcrumb = () => {
  const pathname = usePathname() || "/";

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", path: "/" }];

  let currentPath = "";
  segments.forEach((segment, idx) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: formatLabel(segment),
      path: currentPath,
      isActive: idx === segments.length - 1,
    });
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      className="flex items-center space-x-2 text-sm text-muted-foreground mb-6"
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((item, idx) => (
        <React.Fragment key={item.path}>
          {idx === 0 ? (
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          ) : (
            <Link
              href={item.path}
              className={`hover:text-foreground transition-colors ${
                item.isActive ? "text-foreground font-medium" : ""
              }`}
            >
              {item.label}
            </Link>
          )}

          {idx < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
