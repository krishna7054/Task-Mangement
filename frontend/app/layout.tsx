"use client"; // This must be the first line in the file

import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Task Management Dashboard',
//   description: 'Manage your tasks efficiently',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navbar />
          <ToastContainer />
          {children}
        </Provider>
      </body>
    </html>
  );
}
