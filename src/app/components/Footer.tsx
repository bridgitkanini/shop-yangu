import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full flex flex-row bg-primary text-white px-6 py-4 justify-between items-center">
      <div className="flex space-x-8">
        <a href="/terms" className="hover:text-yellow-500">
          Terms & Conditions
        </a>
        <a href="/privacy" className="hover:text-yellow-500">
          Privacy Policy
        </a>
        <a href="/shipping" className="hover:text-yellow-500">
          Shipping Policy
        </a>
        <a href="/refund" className="hover:text-yellow-500">
          Refund Policy
        </a>
      </div>
      <div className="text-sm">
        <span>&copy; 2024 All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
