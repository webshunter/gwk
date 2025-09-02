"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { MapPin, ChevronDown, Menu, X, Plus, Minus } from "lucide-react";
import { MegaMenuItems, navItems } from "@/data/data-navbar";

const Navbar = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hideTween = useRef<gsap.core.Tween | null>(null);
  const showTween = useRef<gsap.core.Tween | null>(null);
  const lastScrollY = useRef(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuItems | null>(
    null
  );
  const [activeNavItem, setActiveNavItem] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    gsap.set(navbar, { y: 0, autoAlpha: 1 });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (window.innerWidth >= 1024) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          if (!hideTween.current?.isActive()) {
            hideTween.current = gsap.to(navbar, {
              y: -120,
              autoAlpha: 0,
              duration: 0.6,
              ease: "power2.inOut",
            });
          }
          setActiveMegaMenu(null);
        } else {
          if (!showTween.current?.isActive()) {
            showTween.current = gsap.to(navbar, {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power2.inOut",
            });
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setExpandedMobileItem("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!megaMenuRef.current) return;

    if (activeMegaMenu && window.innerWidth >= 1024) {
      gsap.fromTo(
        megaMenuRef.current,
        { opacity: 0, y: -10, display: "none" },
        {
          opacity: 1,
          y: 0,
          display: "block",
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(megaMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (megaMenuRef.current) {
            megaMenuRef.current.style.display = "none";
          }
        },
      });
    }
  }, [activeMegaMenu]);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20, height: 0 },
        { opacity: 1, y: 0, height: "auto", duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        height: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isMobileMenuOpen]);

  const handleMouseEnter = useCallback(
    (menuData: MegaMenuItems, itemTitle: string) => {
      if (window.innerWidth < 1024) return;

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setActiveMegaMenu(menuData);
      setActiveNavItem(itemTitle);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth < 1024) return;

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setActiveNavItem("");
    }, 150);
  }, []);

  const cancelHide = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleLinkClick = useCallback(() => {
    setActiveMegaMenu(null);
    setActiveNavItem("");
    setIsMobileMenuOpen(false);
    setExpandedMobileItem("");
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setActiveMegaMenu(null);
    setExpandedMobileItem("");
  }, []);

  const toggleMobileSubmenu = useCallback((itemTitle: string) => {
    setExpandedMobileItem((prev) => (prev === itemTitle ? "" : itemTitle));
  }, []);

  return (
    <>
      <header
        className={`w-full fixed top-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-sm"
        }`}
        ref={navbarRef}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="max-w-10xl mx-auto">
            <div className="flex items-center justify-between lg:justify-center gap-10  h-70 ">
              <div className="flex-shrink-0">
                <Link href="/" className="block">
                  <div className="relative w-98 h-98">
                    <Image
                      src="/images/logogwk.svg"
                      alt="GWK Logo"
                      priority
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
              </div>

              <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navItems.map((item) => (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() =>
                      item.hasMegaMenu &&
                      item.megaMenuItems &&
                      handleMouseEnter(item.megaMenuItems, item.title)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                        activeNavItem === item.title
                          ? "text-amber-600 bg-amber-50"
                          : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                      }`}
                      onClick={handleLinkClick}
                    >
                      <span>{item.title}</span>
                      {item.hasMegaMenu && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            activeNavItem === item.title ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Desktop CTA Button */}
              <div className="hidden lg:block flex-shrink-0">
                <Link href="/tickets" className="block">
                  <div className="relative w-98 h-98">
                    <Image
                      src="/images/image-buy-ticket.png"
                      alt="Buy Ticket"
                      priority
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                {/* Mobile CTA */}
                <Link href="/tickets" className="block">
                  <div className="relative w-50 h-50  md:landscape:w-98 md:landscape:h-98">
                    <Image
                      src="/images/image-buy-ticket.png"
                      alt="Buy Ticket"
                      priority
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>

                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 mx-4"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-38 h-38  text-gray-700" />
                  ) : (
                    <Menu className="w-38 h-38 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={mobileMenuRef}
          className={`lg:hidden overflow-hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white  border-gray-200 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="container mx-auto px-3 sm:px-4 py-4">
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  {item.hasMegaMenu ? (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu(item.title)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="font-medium">{item.title}</span>
                        {expandedMobileItem === item.title ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expandedMobileItem === item.title
                            ? "max-h-auto opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="bg-gray-50 px-4 py-2">
                          {item.megaMenuItems?.subPages.map((subPage) => (
                            <Link
                              key={subPage.href}
                              href={subPage.href}
                              className="block py-2 px-4 text-sm text-gray-600 hover:text-amber-600 hover:bg-white rounded transition-all duration-200"
                              onClick={handleLinkClick}
                            >
                              <div className="font-medium">{subPage.title}</div>
                              {subPage.description && (
                                <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                                  {subPage.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-colors duration-200 font-medium"
                      onClick={handleLinkClick}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Button */}
              <div className="mt-4 px-4">
                <Link
                  href="/tickets"
                  className="block w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-center px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleLinkClick}
                >
                  Buy Tickets Now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Desktop Mega Menu Dropdown */}
      <div
        ref={megaMenuRef}
        className="fixed top-70 left-0 right-0 z-[999] bg-white  border-gray-100 shadow-xl hidden lg:block"
        onMouseEnter={cancelHide}
        onMouseLeave={handleMouseLeave}
      >
        {activeMegaMenu && (
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sub Pages - 2 columns */}
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Explore Options
                </h3>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
                  {activeMegaMenu.subPages.map((subPage) => (
                    <Link
                      key={subPage.href}
                      href={subPage.href}
                      className="group flex flex-col py-3 hover:bg-gray-50 px-3 rounded-lg transition-all duration-200"
                      onClick={handleLinkClick}
                    >
                      <span className="text-gray-900 font-medium group-hover:text-amber-600 transition-colors duration-200">
                        {subPage.title}
                      </span>
                      {subPage.description && (
                        <span className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                          {subPage.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Content */}
              <div className="relative">
                <div className="bg-transparent p-6 h-full">
                  <div className="flex flex-col justify-between h-full min-h-[200px]">
                    <div>
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{
                          color: "var(--color-dark-forest-green, #1f2937)",
                        }}
                      >
                        {activeMegaMenu.featuredTitle}
                      </h3>
                      <p
                        className="text-sm mb-6 leading-relaxed"
                        style={{ color: "var(--color-steel-navy, #4b5563)" }}
                      >
                        {activeMegaMenu.featuredDescription}
                      </p>

                      {/* Location & Stats */}
                      <div
                        className="p-4 border rounded-lg"
                        style={{
                          backgroundColor: "var(--color-soft-snow, #f9fafb)",
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <MapPin
                            size={24}
                            strokeWidth={1.75}
                            style={{
                              color: "var(--color-steel-navy, #4b5563)",
                            }}
                          />
                          <div>
                            <p
                              className="text-sm font-medium"
                              style={{
                                color:
                                  "var(--color-dark-forest-green, #1f2937)",
                              }}
                            >
                              Garuda Wisnu Kencana
                            </p>
                            <p
                              className="text-xs"
                              style={{
                                color: "var(--color-steel-navy, #6b7280)",
                              }}
                            >
                              Ungasan, Bali
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="text-center">
                            <p
                              className="font-semibold"
                              style={{
                                color:
                                  "var(--color-dark-forest-green, #1f2937)",
                              }}
                            >
                              {activeMegaMenu.stats.left.value}
                            </p>
                            <p
                              style={{
                                color: "var(--color-steel-navy, #6b7280)",
                              }}
                            >
                              {activeMegaMenu.stats.left.label}
                            </p>
                          </div>
                          <div className="text-center">
                            <p
                              className="font-semibold"
                              style={{
                                color:
                                  "var(--color-dark-forest-green, #1f2937)",
                              }}
                            >
                              {activeMegaMenu.stats.center.value}
                            </p>
                            <p
                              style={{
                                color: "var(--color-steel-navy, #6b7280)",
                              }}
                            >
                              {activeMegaMenu.stats.center.label}
                            </p>
                          </div>
                          <div className="text-center">
                            <p
                              className="font-semibold"
                              style={{
                                color:
                                  "var(--color-dark-forest-green, #1f2937)",
                              }}
                            >
                              {activeMegaMenu.stats.right.value}
                            </p>
                            <p
                              style={{
                                color: "var(--color-steel-navy, #6b7280)",
                              }}
                            >
                              {activeMegaMenu.stats.right.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[998] lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Navbar;
