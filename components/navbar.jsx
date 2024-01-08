"use client"
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home">
          <div className="text-white font-bold text-xl">Admin Portal</div>
        </Link>
        <div className="hidden lg:flex space-x-4">
          <Link href="/home">
            <div className="text-white mx-4">Home</div>
          </Link>
          <Link href="/employee">
            <div className="text-white mx-4">Employee</div>
          </Link>
          <Link href="/projectList">
            <div className="text-white mx-4">Projects</div>
          </Link>
          <Link href="/attendence">
            <div className="text-white mx-4">Attendence</div>
          </Link>
          <Link href="/employeeform">
            <div className="text-white mx-4">+New Employee</div>
          </Link>
          <Link href="/projectform">
            <div className="text-white mx-4">+New Project</div>
          </Link>
          <Link href="/investor">
            <div className="text-white mx-4">Investors</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

