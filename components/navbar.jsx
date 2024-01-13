"use client"
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home">
          <div className="text-white font-bold text-xl">ADMIN PORTAL</div>
        </Link>
        <div className="hidden lg:flex space-x-4">
          <Link href="/home">
            <div className="text-white mx-4">HOME</div>
          </Link>
          <Link href="/employee">
            <div className="text-white mx-4">EMPLOYEE</div>
          </Link>
          <Link href="/projectList">
            <div className="text-white mx-4">PROJECTS</div>
          </Link>
          <Link href="/attendence">
            <div className="text-white mx-4">ATTENDENCE</div>
          </Link>
          <Link href="/investor">
            <div className="text-white mx-4">INVESTORS</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

