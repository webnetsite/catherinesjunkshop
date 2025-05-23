import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginSession from "./LoginSession";
import vmis from '../public/images/vmis.png';
import Image from 'next/image';

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="flex items-center p-3 flex-wrap text-white bg-blue-700 print:hidden relative z-10">
      <div
        id="logo"
        className="lg:text-xl p-2 mr-4 inline-flex items-center font-mono font-bold"
      >
        <Link href="/">
          <Image
            src={vmis}
            alt="Logo"
            height={35}
            width={35}
          />
        </Link>
      </div>

      <button
        onClick={() => setShowNav(!showNav)}
        type="button"
        className="inline-flex p-3 text-white hover:text-gray-300 focus:text-white focus:outline-none lg:hidden ml-auto"
      >
        <svg
          className="h-6 w-6 fill-current"
          viewBox="0 -53 384 384"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        </svg>
      </button>

      {/* Desktop Nav */}
      <div className="w-full flex-grow lg:inline-flex lg:flex-grow lg:w-auto hidden lg:flex lg:items-center lg:justify-end">
        <Link href="/">
          <span className="lg:inline-flex lg:w-auto px-3 py-2 rounded hover:bg-blue-800">
            Home
          </span>
        </Link>
        <Link href="/list_driver">
          <span className="lg:inline-flex lg:w-auto px-3 py-2 rounded hover:bg-blue-800">
            Price List
          </span>
        </Link>
        <LoginSession />
      </div>

      {/* Fullscreen Mobile Nav */}
      {showNav && (
        <div className="fixed inset-0 bg-blue-700 z-50 flex flex-col items-center justify-center space-y-6 text-white text-3xl">
          <button
            onClick={() => setShowNav(false)}
            className="absolute top-4 right-6 text-white text-3xl"
          >
            ×
          </button>

          <Link href="/" onClick={() => setShowNav(false)}>
            <span>Home</span>
          </Link>
          <Link href="/list_driver" onClick={() => setShowNav(false)}>
            <span>Price List</span>
          </Link>
          <div onClick={() => setShowNav(false)}>
            <LoginSession />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
