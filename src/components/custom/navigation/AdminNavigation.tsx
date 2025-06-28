import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import Link from "next/link"; 

const AdminNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-primary">MyApp</div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/admin/home" className="text-gray-700 hover:text-primary">Home</Link>
          </div>

          {/* Mobile hamburger button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block text-gray-700 hover:text-primary">Home</Link>
          <Link href="/about" className="block text-gray-700 hover:text-primary">About</Link>
          <Link href="/services" className="block text-gray-700 hover:text-primary">Services</Link>
          <Link href="/contact" className="block text-gray-700 hover:text-primary">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default AdminNavigation;
