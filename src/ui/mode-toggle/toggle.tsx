'use client'

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/util/cn'

interface ModeToggleProps {
  size?: number
  className?: string
}

const ModeToggle: React.FC<ModeToggleProps> = ({ size = 24, className = '' }) => {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark')

  useEffect(() => {
    setIsDarkMode(theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
    setIsDarkMode((prevMode) => !prevMode)
  }

  const containerSize = {
    width: `${size}px`,
    height: `${size}px`,
  }

  return (
    <>
      <label
        style={containerSize}
        className={cn(
          'relative flex cursor-pointer select-none items-center justify-center',
          className
        )}
      >
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
          className="absolute h-0 w-0 opacity-0"
        />

        <SunIcon
          className={cn(
            'absolute transition-all duration-300 ease-in-out hover:text-yellow-500 focus:text-yellow-500',
            isDarkMode ? 'sun-icon-hide' : 'sun-icon-show'
          )}
          //   size={size}
        />

        <MoonIcon
          className={cn(
            'absolute transition-all duration-300 ease-in-out hover:text-blue-900 focus:text-blue-900',
            isDarkMode ? 'moon-icon-show' : 'moon-icon-hide'
          )}
          // size={size}
        />
      </label>

      <style jsx global>{`
        @keyframes iconShow {
          from {
            opacity: 0;
            transform: rotate(-360deg) scale(0);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }

        @keyframes iconHide {
          from {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
          to {
            opacity: 0;
            transform: rotate(360deg) scale(0);
          }
        }

        .sun-icon-show {
          animation: iconShow 0.5s ease-out forwards;
        }

        .sun-icon-hide {
          animation: iconHide 0.3s ease-in-out forwards;
        }

        .moon-icon-show {
          animation: iconShow 0.5s ease-out forwards;
        }

        .moon-icon-hide {
          animation: iconHide 0.3s ease-in-out forwards;
        }
      `}</style>
    </>
  )
}

export default ModeToggle
