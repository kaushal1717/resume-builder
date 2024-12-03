import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      aria-label="Site Header"
      className={`flex py-3 items-center border-b-2 border-gray-100 px-4 md:px-12 relative`}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={"/logo.svg"} alt="Resume Logo" height={40} width={40} />
          <div className="ml-2 text-primary font-bold text-2xl">CareerAI</div>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation */}
        <nav
          aria-label="Site Nav Bar"
          className={`${
            isMenuOpen
              ? "absolute top-full left-0 right-0 bg-white shadow-lg border-b border-gray-100"
              : "hidden"
          } md:flex md:static md:shadow-none md:border-none md:bg-transparent md:flex-row items-center gap-2 text-sm font-medium`}
        >
          {[
            ["/", "Builder"],
            ["https://career-ai-project.vercel.app/resume-parser", "Parser"],
            ["https://career-ai-project.vercel.app/interview", "Interview"],
          ].map(([href, text]) => (
            <Link
              key={text}
              className="block w-full md:w-auto px-4 py-2 text-gray-500 hover:text-primary hover:bg-gray-100/50 rounded-md transition-colors"
              to={href}
              onClick={() => setIsMenuOpen(false)}
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
