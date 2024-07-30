'use client';
import NavLink from '@/components/NavLink';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  LucideLineChart,
  UserRoundCog,
  UsersRound,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';
import { set } from 'date-fns';

const DashboardSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    if (isExpanded) {
      // setPosition({ x: 130, y: 400 });
    } else {
      // setPosition({ x: -40, y: 400 });
    }
  }, [isExpanded]);

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(lastScrollY);
          ticking = false;
        });
        ticking = true;
      }
      // setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const maxScroll = 1000; // Maximum scroll value before the button is fully at the top
  const startPosition = 60; // Starting vertical position as a percentage
  const endPosition = 0; // Ending vertical position (at the top)
  const dynamicTop = Math.max(
    endPosition,
    startPosition - startPosition * (scrollY / maxScroll),
  );

  return (
    <aside
      className={`transition-width duration-300 border-r-2 relative  ${
        isExpanded ? 'w-48' : 'w-0 mr-2'
      } bg-white`}
    >
      <nav className="h-fit flex flex-col bg-white ">
        <div className="p-4 pb-2 flex justify-between items-center ">
          <div className={`${isExpanded ? '' : 'hidden'} `}>
            <Logo />
          </div>
          <button
            onClick={toggleSidebar}
            className={`absolute transition-all duration-300 ${
              isExpanded ? 'left-40' : 'left-0'
            }`}
            style={{
              top: `${dynamicTop}%`,
              transitionProperty: 'top 0.5s ease-out',
            }}
          >
            {isExpanded ? (
              <div className="border-l-2 rounded-l-full border-x-dark_brown overflow-hidden">
                <ChevronLeft size={30} />
              </div>
            ) : (
              <div className="border-r-2 rounded-r-full border-x-dark_brown overflow-hidden">
                <ChevronRight size={30} />
              </div>
            )}
          </button>
        </div>

        <div
          className={`mt-2 transition-opacity duration-500 ease-in-out ${
            isExpanded ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
          }`}
          style={{ overflow: 'hidden' }}
        >
          {' '}
          <NavLink
            to="/admin/general"
            className="p-4 flex items-cente hover:opacity-70 cursor-pointer transition duration-300"
            activeClassName="bg-[#3A1B05] text-white"
            icon={<LucideLineChart className="mr-3" />}
          >
            General
          </NavLink>
          <NavLink
            to="/admin/users"
            className="p-4 flex items-cente hover:opacity-70 cursor-pointer transition duration-300"
            activeClassName="bg-[#3A1B05] text-white"
            icon={<UserRoundCog className="mr-3" />}
          >
            User Table
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
