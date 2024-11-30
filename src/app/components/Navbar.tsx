"use client";

import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");

  const navItems = [
    { name: "home", label: "Home", href: "/" },
    { name: "shop", label: "Shop", href: "/shop" },
    { name: "product", label: "Product", href: "/product" },
  ];

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const path = window.location.pathname; // Get the current URL path
    if (path === "/") setActiveLink("home");
    else if (path === "/shop") setActiveLink("shop");
    else if (path === "/product") setActiveLink("product");
  }, []);

  return (
    <nav className="bg-white text-blue-600 px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-semibold">
        <span className="text-primary">Shop</span>
        <span className="text-secondary">Yangu</span>
      </div>
      <ul className="flex space-x-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              onClick={() => handleLinkClick(item.name)}
              className={`text-primary font-bold hover:text-yellow-500 hover:tracking-widest transition-all duration-300 ${
                activeLink === item.name
                  ? "text-secondary"
                  : "active:text-secondary"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
