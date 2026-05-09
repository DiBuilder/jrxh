'use client'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
      applyTheme(saved)
    } else {
      applyTheme('system')
    }
  }, [])

  const applyTheme = (value) => {
    const root = document.documentElement
    if (value === 'dark') {
      root.classList.add('dark')
    } else if (value === 'light') {
      root.classList.remove('dark')
    } else {
      // system
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }

  const handleChange = (value) => {
    setTheme(value)
    localStorage.setItem('theme', value)
    applyTheme(value)
  }

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  if (!mounted) return null

  const options = [
    { value: 'light', label: '浅色', icon: SunIcon },
    { value: 'system', label: '跟随', icon: SystemIcon },
    { value: 'dark', label: '深色', icon: MoonIcon },
  ]

  return (
    <div className="flex items-center gap-1 bg-bg-tertiary rounded-xl p-1">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => handleChange(value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all duration-200 ${
            theme === value
              ? 'bg-white dark:bg-bg-secondary text-text-primary shadow-sm'
              : 'text-text-tertiary hover:text-text-secondary'
          }`}
          title={label}
        >
          <Icon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}

function SunIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  )
}

function SystemIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  )
}
