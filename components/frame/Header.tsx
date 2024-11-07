'use client';

import { Brain } from 'lucide-react'; // Assuming Brain icon represents AI
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Switch } from '../ui/switch';

const TABS = [
  {
    href: '/',
    label: 'Chat',
  },
  {
    href: '/my-collections',
    label: 'My Collection',
  },
  {
    href: '/marketplace',
    label: 'Marketplace',
  },
];

const Header = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(TABS[0].href);
  const [darkMode, setDarkMode] = useState(false);

  const handleChangeTab = (href: string) => {
    setActiveTab(href);
    router.push(href);
  };

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      return;
    }
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  };

  useEffect(() => {
    const isDarkMode =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  return (
    <header className='fixed top-0 left-0 right-0 bg-background p-4 shadow-md z-50'>
      <div className='container mx-auto flex justify-between items-center'>
        <div
          className='flex items-center space-x-4'
          onClick={() => handleChangeTab('/')}
        >
          <Brain className='h-8 w-8 cursor-pointer' />
          <h1 className='text-2xl font-bold cursor-pointer'>Mint Verse</h1>
        </div>

        <div className='flex items-center gap-4'>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />

          <div className='flex space-x-1'>
            {TABS.map((tab) => (
              <button
                key={tab.href}
                onClick={() => handleChangeTab(tab.href)}
                className={`${
                  activeTab === tab.href
                    ? ''
                    : 'hover:text-black/60 dark:hover:text-white/60'
                } relative rounded-full px-3 py-1.5 text-sm font-medium text-black dark:text-white outline-sky-400 transition focus-visible:outline-2`}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {activeTab === tab.href && (
                  <motion.span
                    layoutId='bubble'
                    className='absolute inset-0 z-10 bg-white mix-blend-difference'
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
