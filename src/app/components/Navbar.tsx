"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const pathname = usePathname(); // Use Next.js hook instead of window.location

  const navItems = [
    { name: "home", label: "Home", href: "/" },
    { name: "shop", label: "Shops", href: "/shops" },
    { name: "product", label: "Products", href: "/products" },
  ];

  useEffect(() => {
    // Match the pathname to set active link
    if (pathname === "/") setActiveLink("home");
    else if (pathname === "/shops") setActiveLink("shop");
    else if (pathname === "/products") setActiveLink("product");
  }, [pathname]); // Add pathname as dependency

  return (
    <nav className="bg-white w-full shadow-lg text-blue-600 px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-semibold">
        <span className="text-primary">Shop</span>
        <span className="text-secondary">Yangu</span>
      </div>
      <ul className="flex space-x-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`text-primary font-bold hover:text-yellow-500 hover:tracking-widest transition-all duration-300 ${
                activeLink === item.name ? "text-secondary" : "text-primary"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
