"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp, LogOut } from "lucide-react"; 
import Link from "next/link"; 
import Image from "next/image";
import { useSelector } from "react-redux";

const AdminNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubMenu = () => setShowSubMenu(!showSubMenu);

  const name = typeof window !== "undefined" ? localStorage.getItem('name') || 'Guest' : 'Guest';
  const authData = useSelector((state: { auth: any }) => state.auth);

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-primary">
            <Image
              src="/logo-transparent.png"
              alt="logo"
              width={70}
              height={70}
              className="flex justify-center"
            />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Menu with dropdown on hover */}
            <div className="relative group">
              <Link href="/admin/home"  className="text-gray-700 hover:text-primary flex items-center gap-1">Home</Link>
            </div>
             {/* Menu with dropdown on hover */}
             <div className="relative group">
              <button className="text-gray-700 hover:text-primary flex items-center gap-1">
                Data 
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                <Link href="/admin/region" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Region</Link>
                <Link href="/admin/congregation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Jemaat</Link>
              </div>
            </div>
          </div>

          {/* Profile - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Image
              src="/auth/guest.png"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-md font-bold">{name}</p>
            <Link href="/auth/login" className="text-gray-700 hover:text-primary flex items-center">
              <LogOut className="ml-1" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">

          <div className="relative group">
            <Link href="/admin/home"  className="text-gray-700 hover:text-primary flex items-center gap-1">Home</Link>
          </div>
          {/* Toggle-able Home submenu */}
          <div>
            <button onClick={toggleSubMenu} className="flex justify-between w-full text-gray-700 hover:text-primary">
              Data {showSubMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showSubMenu && (
              <div className="pl-4 mt-2 space-y-1">
                <Link href="/admin/region" className="block text-gray-600 hover:text-primary text-sm">Region</Link>
                <Link href="/admin/congregation" className="block text-gray-600 hover:text-primary text-sm">Jemaat</Link>
              </div>
            )}
          </div>

          {/* Profile - Mobile */}
          <div className="flex items-center gap-3 mt-4">
            <Image
              src="/auth/guest.png"
              alt="profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-md font-bold">{authData.name}</p>
              <Link href="/auth/login" className="flex items-center text-sm text-gray-700 hover:text-primary">
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavigation;
