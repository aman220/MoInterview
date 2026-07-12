'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, LayoutDashboard, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { dashboardPath } from '@/lib/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, hydrated, logout } = useAuth()
  const router = useRouter()

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : ''
  const dashHref = dashboardPath(user)

  const navLinks = [
    { label: 'Coaches', href: '/find-interviewers' },
    { label: 'Become a Coach', href: '/become-interviewer' },
  ]

  const handleLogout = async () => {
    await logout()
    setMobileMenuOpen(false)
    toast.success('Signed out', { description: 'You have been logged out.' })
    router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-foreground hover:text-muted-foreground transition-smooth">
            <span className="text-sm uppercase tracking-widest font-light">MoInterview</span>
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
            {hydrated && user && (
              <Link
                href={dashHref}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-smooth font-light"
              >
                Dashboard
              </Link>
            )}
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

            {/* Auth cluster — only after hydration to avoid a flash */}
            {hydrated && (
              user ? (
                <div className="hidden sm:flex items-center gap-4">
                  <Link
                    href={dashHref}
                    className="h-10 px-4 text-xs uppercase tracking-widest rounded-none border border-foreground text-foreground hover:bg-foreground hover:text-background transition-smooth font-light flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex items-center gap-2 focus:outline-none"
                        aria-label="Account menu"
                      >
                        <span className="hidden lg:inline text-xs uppercase tracking-widest text-muted-foreground font-light">
                          {user.firstName}
                        </span>
                        <Avatar className="h-9 w-9 border border-border">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-light">
                            {initials || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="font-light">
                        <div className="text-sm text-foreground">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={dashHref} className="flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/dashboard/settings" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link
                    href="/login"
                    className="h-10 px-4 text-xs uppercase tracking-widest rounded-none border border-foreground text-foreground hover:bg-foreground hover:text-background transition-smooth font-light flex items-center"
                  >
                    SIGN IN
                  </Link>
                  <Link
                    href="/signup"
                    className="h-10 px-6 text-xs uppercase tracking-widest rounded-none bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-light flex items-center"
                  >
                    SIGN UP
                  </Link>
                </div>
              )
            )}

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
          <div className="md:hidden pb-6 space-y-4 border-t border-border pt-6 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-smooth font-light py-2"
              >
                {link.label}
              </Link>
            ))}

            {hydrated && user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-light">
                      {initials || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-light text-foreground">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                  </div>
                </div>
                <Link
                  href={dashHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-smooth font-light py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-xs uppercase tracking-widest text-destructive font-light py-2"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="border-t border-border pt-4 flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 px-3 text-xs uppercase tracking-widest border border-foreground text-foreground rounded hover:bg-foreground hover:text-background transition-smooth font-light text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 px-3 text-xs uppercase tracking-widest bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-smooth font-light text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
