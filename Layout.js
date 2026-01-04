import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ShoppingCart, 
  Settings,
  ChevronDown,
  LayoutDashboard
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (e) {
        // Not logged in
      }
      
      try {
        const siteSettings = await base44.entities.SiteSettings.list();
        if (siteSettings.length > 0) {
          setSettings(siteSettings[0]);
        }
      } catch (e) {
        console.log("No site settings found");
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
    navigate(createPageUrl("Home"));
  };

  const isHomePage = currentPageName === "Home";
  const isAuthPage = currentPageName === "SignUp" || currentPageName === "Login" || currentPageName === "CompleteProfile";

  // Hide layout for auth pages
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="h-10" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Home className="w-5 h-5 text-white" />
                </div>
              )}
              <span className={`text-xl font-bold ${isScrolled || !isHomePage ? 'text-slate-900' : 'text-white'}`}>
                {settings?.site_name || "Remote Roofers"}
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                to={createPageUrl("Home")} 
                className={`font-medium transition-colors ${
                  isScrolled || !isHomePage ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'
                }`}
              >
                Home
              </Link>
              <a 
                href="#pricing" 
                className={`font-medium transition-colors ${
                  isScrolled || !isHomePage ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'
                }`}
              >
                Pricing
              </a>
              {user && (
                <Link 
                  to={createPageUrl("OrderPage")} 
                  className={`font-medium transition-colors ${
                    isScrolled || !isHomePage ? 'text-slate-600 hover:text-slate-900' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Order Now
                </Link>
              )}
            </nav>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={`flex items-center gap-2 ${
                        isScrolled || !isHomePage ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-medium">
                        {user.full_name?.charAt(0) || user.email?.charAt(0)}
                      </div>
                      <span className="max-w-[120px] truncate">{user.full_name || user.email}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("MyOrders")} className="flex items-center gap-2 cursor-pointer">
                        <ShoppingCart className="w-4 h-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Profile")} className="flex items-center gap-2 cursor-pointer">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={createPageUrl("AdminDashboard")} className="flex items-center gap-2 cursor-pointer">
                            <LayoutDashboard className="w-4 h-4" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={createPageUrl("AdminSettings")} className="flex items-center gap-2 cursor-pointer">
                            <Settings className="w-4 h-4" />
                            Site Settings
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className={isScrolled || !isHomePage ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}
                    onClick={() => base44.auth.redirectToLogin()}
                  >
                    Login
                  </Button>
                  <Link to={createPageUrl("SignUp")}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled || !isHomePage ? 'text-slate-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled || !isHomePage ? 'text-slate-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="px-6 py-4 space-y-3">
              <Link 
                to={createPageUrl("Home")} 
                className="block py-2 text-slate-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#pricing" 
                className="block py-2 text-slate-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              {user && (
                <>
                  <Link 
                    to={createPageUrl("OrderPage")} 
                    className="block py-2 text-slate-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Order Now
                  </Link>
                  <Link 
                    to={createPageUrl("MyOrders")} 
                    className="block py-2 text-slate-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to={createPageUrl("Profile")} 
                    className="block py-2 text-slate-700 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {user.role === 'admin' && (
                    <>
                      <Link 
                        to={createPageUrl("AdminDashboard")} 
                        className="block py-2 text-slate-700 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <Link 
                        to={createPageUrl("AdminSettings")} 
                        className="block py-2 text-slate-700 font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Site Settings
                      </Link>
                    </>
                  )}
                  <button 
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="block py-2 text-red-600 font-medium w-full text-left"
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <div className="pt-4 space-y-3 border-t border-slate-100">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => { base44.auth.redirectToLogin(); setIsMenuOpen(false); }}
                  >
                    Login
                  </Button>
                  <Link to={createPageUrl("SignUp")} onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className={isHomePage ? '' : 'pt-20'}>
        {children}
      </main>
    </div>
  );
}
