'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Coaches', href: '/find-interviewers' },
    { label: 'Become a Coach', href: '/become-interviewer' },
    { label: 'Dashboard', href: '/dashboard' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Minimal */}
          <Link href="/" className="text-foreground hover:text-muted-foreground transition-smooth">
            <span className="text-sm uppercase tracking-widest font-light">InterviewHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-smooth font-light"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-muted rounded transition-smooth"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              ) : (
                <Moon className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              )}
            </button>

            {/* Sign in button */}
            <Button
              variant="ghost"
              className="hidden sm:flex h-10 px-4 text-xs uppercase tracking-widest rounded-none border border-foreground text-foreground hover:bg-foreground hover:text-background transition-smooth font-light"
            >
              SIGN IN
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded transition-smooth"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 space-y-4 border-t border-border pt-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-smooth font-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
