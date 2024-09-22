"use client"; // This must be the first line in the file

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { TIMEOUT } from 'dns';


export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!token);
    window.location.reload;
  }, [100]);

  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('Logout successfully');
    router.push('/');
    router.refresh();
  }

  return (
    <nav className="navbar p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
      {!isLoggedIn && (
        <div className="flex items-center space-x-4">
          <Link href="/tasks" className="text-xl font-bold hover:text-blue-300 transition duration-300">Task List</Link>
          <Link href="/kanban" className="text-xl font-bold hover:text-blue-300 transition duration-300">Kanban Board</Link>
        </div>
      )}

        <div className="flex  mt-4 md:mt-0">
          {isLoggedIn && (
            <>
              <Link href="/login" className="hover:bg-blue-500 transition duration-300 bg-blue-400 rounded-s-full "><Button variant="ghost" size="lg">Login</Button> </Link>
              <Link href="/register" className="hover:bg-blue-500 transition duration-300 bg-blue-400 rounded-e-full"><Button variant="ghost" size="lg" >Register</Button></Link>
            </>
          )}
          {!isLoggedIn && (
            <Button variant="destructive" size="default" className="bg-blue-500 hover:bg-blue-600"
              onClick={handleLogout} 
              
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
