import Navbar from './Navbar';

import { Toaster } from 'react-hot-toast';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Toaster />
      <main >{children}</main>
    </>
  );
}
