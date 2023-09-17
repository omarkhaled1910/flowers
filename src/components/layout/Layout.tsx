import * as React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';
import { ComplexNavbar as Navbar } from '@/components/navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <Navbar />
      <div className='min-h-screen p-5'>{children} </div>
      <footer className=' bottom-2 flex justify-center text-gray-700'>
        © {new Date().getFullYear()} By{' '}
        <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
          Omar Khaled
        </UnderlineLink>
      </footer>
    </>
  );
}
