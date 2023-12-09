'use client';
import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [open, setOpen] = useState(false);
  const routes = [
    { title: 'Home', path: '/' },
    { title: 'Question', path: '/question' },
    { title: 'State', path: '/state' },
    { title: 'Quiz', path: '/quiz' },
  ];

  return (
    <header className='shadow-lg'>
      {/* 사이드 네브 */}
      <div
        className={`fixed lg:hidden transtion-all z-20 duration-300 ${
          open ? 'right-0' : '-right-64'
        } p-4 h-screen w-64 bg-orange-700`}
      >
        <XCircleIcon
          className={`w-8 h-8 stroke-slate-50 mb-4`}
          stroke='2'
          onClick={() => setOpen(false)}
        />
        <div className='flex flex-col space-y-4' onClick={() => setOpen(false)}>
          {routes.map((route) => (
            <Link
              className={'px-6 py-2 text-slate-200 rounded bg-orange-400'}
              href={route.path}
              key={route.path}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </div>
      {/* 위 헤더 네브 */}
      <div className='flex justify-between items-center px-6 py-4 bg-orange-400'>
        <div className='text-slate-50 text-xl sm:text4xl lg:text-2xl xl:text-2xl font-bold'>
          AppRouteQuizApp
        </div>
        <nav className='space-x-4 hidden lg:flex'>
          {routes.map((route) => (
            <Link
              className={'px-6 py-2 text-slate-200 rounded bg-orange-700'}
              href={route.path}
              key={route.path}
            >
              {route.title}
            </Link>
          ))}
        </nav>
        <Bars3Icon
          onClick={() => setOpen(!open)}
          className='w-6 h-6 stroke-indigo-50 lg:hidden'
        />
      </div>
    </header>
  );
};

export default Header;
