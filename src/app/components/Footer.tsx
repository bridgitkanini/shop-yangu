const Footer = () => {
  return (
    <footer className="bg-primary text-white fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <a
              href="/terms"
              className="hover:text-yellow-500 text-center md:text-left"
            >
              Terms & Conditions
            </a>
            <a
              href="/privacy"
              className="hover:text-yellow-500 text-center md:text-left"
            >
              Privacy Policy
            </a>
            <a
              href="/shipping"
              className="hover:text-yellow-500 text-center md:text-left"
            >
              Shipping Policy
            </a>
            <a
              href="/refund"
              className="hover:text-yellow-500 text-center md:text-left"
            >
              Refund Policy
            </a>
          </div>
          <div className="text-sm text-center md:text-right">
            <span>&copy; 2024 All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
