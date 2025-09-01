"use client";
/* eslint-disable */
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ChevronUp, LogOut, User } from "lucide-react"; 
import Link from "next/link"; 
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation"
import api from "@/lib/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const AdminNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [imageLink, setImageLink] = useState<string>('')
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubMenu = () => setShowSubMenu(!showSubMenu);
  const pathName = usePathname()

  const name = typeof window !== "undefined" ? localStorage.getItem('name') || 'Guest' : 'Guest';
  const authData = useSelector((state: { auth: any }) => state.auth);

    const getProfileImage = async () => {
      try {
        const res = await api.get(`profile/${authData.id}`, {})
        const link = res.data.data[0].linkImage

        setImageLink(`${link}?t=${new Date().getTime()}`) // Prevent caching with timestamp
      } catch {

      }
    }

  useEffect(()=> {
    setIsOpen(false)
    setShowSubMenu(false)
  },[pathName])

  useEffect(()=> {
    getProfileImage()
  },[])

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
          <div className="hidden md:flex items-center space-x-4 shadow p-1 rounded-3xl">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={imageLink === '' ? "/auth/guest.png" : imageLink}
                alt="profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-xl px-1  font-bold flex justify-between">{name} <ChevronDown/></DropdownMenuTrigger>
              <DropdownMenuContent>
                 <DropdownMenuItem asChild>
                     <Link href={`/admin/profile/${authData.id}/${authData.name}`} className="text-gray-700 hover:text-primary flex items-center">
                      <User className="mx-1" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login" className="text-gray-700 hover:text-primary flex items-center">
                      <LogOut className="mx-1" /> Logout
                    </Link>
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
         <div className="md:flex items-center space-x-4 shadow p-1 rounded-3xl flex w-1/2">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={imageLink === '' ? "/auth/guest.png" : imageLink}
                alt="profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-xl px-1  font-bold flex justify-between">{name} <ChevronDown/></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                     <Link href={`/admin/profile/${authData.id}/${authData.name}`} className="text-gray-700 hover:text-primary flex items-center">
                      <User className="mx-1" /> Profile
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Link href="/auth/login" className="text-gray-700 hover:text-primary flex items-center">
                      <LogOut className="mx-1" /> Logout
                    </Link>
                  </DropdownMenuLabel>
                  
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavigation;
