"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blogs", href: "/blogs" },
  { label: "Reviews", href: "/reviews" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 flex h-(--nav-height) items-center justify-between border-b border-black/10 bg-white px-5 sm:px-12 lg:px-24">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.svg" alt="MultyDocs logo" width={48} height={48} />
        <h1 className="text-(--brand-orange) font-black">MultyDocs</h1>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-(--text-gray) hover:text-(--brand-orange) transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span className={`block h-0.5 w-6 bg-(--text) transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-6 bg-(--text) transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-6 bg-(--text) transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full flex flex-col gap-0 bg-white border-t border-black/10 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 text-sm font-medium text-(--text-gray) hover:text-(--brand-orange) hover:bg-black/5 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
