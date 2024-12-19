"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "home", label: "Home", href: "/" },
    { name: "shop", label: "Shops", href: "/shops" },
    { name: "product", label: "Products", href: "/products" },
  ];

  useEffect(() => {
    if (pathname === "/") setActiveLink("home");
    else if (pathname === "/shops") setActiveLink("shop");
    else if (pathname === "/products") setActiveLink("product");
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-white shadow-lg text-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-semibold">
              <span className="text-primary">Shop</span>
              <span className="text-secondary">Yangu</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:text-secondary p-2"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-primary font-medium hover:text-secondary transition-all duration-300 ${
                      activeLink === item.name ? "text-secondary" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <ul className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeLink === item.name
                    ? "text-secondary"
                    : "text-primary hover:text-secondary"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
