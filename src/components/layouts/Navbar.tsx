"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { MapPin, ChevronDown, Menu, X } from "lucide-react";

interface SubPage {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface MegaMenuItems {
  subPages: SubPage[];
  featuredTitle: string;
  featuredDescription: string;
  featuredImage?: string;
  featuredLink?: string;
  stats: {
    left: { value: string; label: string };
    center: { value: string; label: string };
    right: { value: string; label: string };
  };
}

interface NavItem {
  title: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenuItems?: MegaMenuItems;
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Tickets",
    href: "/tickets",
    hasMegaMenu: true,
    megaMenuItems: {
      subPages: [
        {
          title: "Reguler Ticket",
          href: "/tickets/reguler",
          description: "Standard entry ticket for all visitors",
        },
        {
          title: "Reguler + Statue Tour Ticket",
          href: "/tickets/reguler-statue-tour",
          description: "Entry ticket with guided statue tour",
        },
        {
          title: "BarAong Ticket",
          href: "/tickets/baraong",
          description: "Special cultural performance ticket",
        },
        {
          title: "Reguler + BarAong Ticket",
          href: "/tickets/reguler-baraong",
          description: "Combined entry and performance ticket",
        },
        {
          title: "Buggy (add on)",
          href: "/tickets/buggy",
          description: "Transportation service add-on",
        },
      ],
      featuredTitle: "Book Your Visit",
      featuredDescription:
        "Choose from various ticket options to experience the magnificent Garuda Wisnu Kencana cultural park.",
      featuredImage: "/images/tickets-feature.jpg",
      featuredLink: "/tickets",
      stats: {
        left: { value: "Rp 125K", label: "Starting Price" },
        center: { value: "5 Types", label: "Ticket Options" },
        right: { value: "24/7", label: "Online Booking" },
      },
    },
  },
  {
    title: "Top of Statue Tour",
    href: "/top-of-statue-tour",
    hasMegaMenu: true,
    megaMenuItems: {
      subPages: [
        {
          title: "About the Tour",
          href: "/top-of-statue-tour/about",
          description: "Learn about this exclusive experience",
        },
        {
          title: "What's Inside Statue (Video)",
          href: "/top-of-statue-tour/video",
          description: "Virtual preview of the statue interior",
        },
        {
          title: "Most Attractive Spot",
          href: "/top-of-statue-tour/attractive-spot",
          description: "Discover the best viewpoints",
        },
        {
          title: "Buy Ticket",
          href: "/top-of-statue-tour/buy-ticket",
          description: "Book your statue tour experience",
        },
      ],
      featuredTitle: "Experience the Majestic View",
      featuredDescription:
        "Climb to the top of the magnificent Garuda Wisnu Kencana statue and witness breathtaking panoramic views.",
      featuredImage: "/images/statue-tour-feature.jpg",
      featuredLink: "/top-of-statue-tour",
      stats: {
        left: { value: "121m", label: "Statue Height" },
        center: { value: "360°", label: "Panoramic View" },
        right: { value: "20min", label: "Tour Duration" },
      },
    },
  },
  {
    title: "Cultural & Ritual",
    href: "/cultural-ritual",
    hasMegaMenu: true,
    megaMenuItems: {
      subPages: [
        {
          title: "Daily Cultural Performance",
          href: "/cultural-ritual/daily-performance",
          description: "Traditional performances every day",
        },
        {
          title: "Ritual Experience",
          href: "/cultural-ritual/ritual-experience",
          description: "Participate in authentic Balinese rituals",
        },
      ],
      featuredTitle: "Rich Cultural Heritage",
      featuredDescription:
        "Immerse yourself in authentic Balinese cultural performances and sacred rituals.",
      featuredImage: "/images/cultural-feature.jpg",
      featuredLink: "/cultural-ritual",
      stats: {
        left: { value: "3x Daily", label: "Performances" },
        center: { value: "12 Types", label: "Traditional Arts" },
        right: { value: "45min", label: "Show Duration" },
      },
    },
  },
  {
    title: "Activity",
    href: "/activity",
    hasMegaMenu: true,
    megaMenuItems: {
      subPages: [
        {
          title: "Dining",
          href: "/activity/dining",
          description: "Restaurant and cafe options",
        },
        {
          title: "Jendela Bali Restaurant",
          href: "/activity/jendela-bali",
          description: "Fine dining with panoramic views",
        },
        {
          title: "Beranda Resto All You Can Eat",
          href: "/activity/beranda-resto",
          description: "Buffet dining experience",
        },
        {
          title: "Starbucks",
          href: "/activity/starbucks",
          description: "Coffee and refreshments",
        },
        {
          title: "Afung",
          href: "/activity/afung",
          description: "Local cuisine and snacks",
        },
        {
          title: "Shops",
          href: "/activity/shops",
          description: "Souvenir and gift shops",
        },
        {
          title: "Outdoor Activity",
          href: "/activity/outdoor",
          description: "Outdoor experiences and adventures",
        },
        {
          title: "Others",
          href: "/activity/others",
          description: "Additional activities and services",
        },
      ],
      featuredTitle: "Complete Your Experience",
      featuredDescription:
        "From dining to shopping, discover all the activities that make your visit memorable.",
      featuredImage: "/images/activity-feature.jpg",
      featuredLink: "/activity",
      stats: {
        left: { value: "15+", label: "Restaurants" },
        center: { value: "8 Types", label: "Activities" },
        right: { value: "All Day", label: "Available" },
      },
    },
  },
  {
    title: "GWK Events",
    href: "/gwk-events",
    hasMegaMenu: true,
    megaMenuItems: {
      subPages: [
        {
          title: "Festival Ogoh-ogoh",
          href: "/gwk-events/ogoh-ogoh",
          description: "Annual traditional festival celebration",
        },
        {
          title: "Pesta Rakyat",
          href: "/gwk-events/pesta-rakyat",
          description: "People's festival and celebration",
        },
        {
          title: "Festival Penjor",
          href: "/gwk-events/penjor",
          description: "Traditional Balinese decoration festival",
        },
        {
          title: "Bali Countdown",
          href: "/gwk-events/bali-countdown",
          description: "New Year's Eve celebration",
        },
      ],
      featuredTitle: "Spectacular Events",
      featuredDescription:
        "Join us for unforgettable festivals and events that celebrate Balinese culture throughout the year.",
      featuredImage: "/images/events-feature.jpg",
      featuredLink: "/gwk-events",
      stats: {
        left: { value: "20+ Events", label: "Annually" },
        center: { value: "50K+", label: "Attendees" },
        right: { value: "Year Round", label: "Schedule" },
      },
    },
  },
  {
    title: "MICE",
    href: "/mice",
    hasMegaMenu: true,
    megaMenuItems: {
      subPages: [
        {
          title: "Ke Inktree",
          href: "/mice/ke-inktree",
          description: "Premium meeting and event space",
        },
      ],
      featuredTitle: "Perfect Venue for Events",
      featuredDescription:
        "Host your corporate events, meetings, and special occasions in our world-class facilities.",
      featuredImage: "/images/mice-feature.jpg",
      featuredLink: "/mice",
      stats: {
        left: { value: "500", label: "Max Capacity" },
        center: { value: "5 Halls", label: "Event Spaces" },
        right: { value: "Full Service", label: "Catering" },
      },
    },
  },
  {
    title: "Article & News",
    href: "/article-news",
  },
  {
    title: "Jendela Bali Restaurant",
    href: "/jendela-bali",
    hasMegaMenu: true,
    megaMenuItems: {
      subPages: [
        {
          title: "About Jendela Bali Restaurant",
          href: "/jendela-bali/about",
          description: "Discover our signature restaurant",
        },
        {
          title: "Our Menu",
          href: "/jendela-bali/menu",
          description: "Explore our culinary offerings",
        },
        {
          title: "Book Your Table",
          href: "/jendela-bali/reservation",
          description: "Make a reservation",
        },
        {
          title: "Group Lunch & Dinner",
          href: "/jendela-bali/group-dining",
          description: "Special packages for groups",
        },
        {
          title: "Contact Us on WhatsApp",
          href: "/jendela-bali/whatsapp",
          description: "Quick reservation via WhatsApp",
        },
      ],
      featuredTitle: "Fine Dining Experience",
      featuredDescription:
        "Savor exquisite cuisine while enjoying breathtaking views at Jendela Bali Restaurant.",
      featuredImage: "/images/jendela-bali-feature.jpg",
      featuredLink: "/jendela-bali",
      stats: {
        left: { value: "4.9★", label: "Guest Rating" },
        center: { value: "150", label: "Seats Available" },
        right: { value: "11AM-10PM", label: "Open Hours" },
      },
    },
  },
];

const Navbar = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const hideTween = useRef<gsap.core.Tween | null>(null);
  const showTween = useRef<gsap.core.Tween | null>(null);
  const lastScrollY = useRef(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuItems | null>(
    null
  );
  const [activeNavItem, setActiveNavItem] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    gsap.set(navbar, { y: 0, autoAlpha: 1 });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add background blur when scrolled
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        if (!hideTween.current?.isActive()) {
          hideTween.current = gsap.to(navbar, {
            y: -120,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.inOut",
          });
        }
        // Close mega menu when scrolling
        setActiveMegaMenu(null);
      } else {
        // Scroll up: show navbar
        if (!showTween.current?.isActive()) {
          showTween.current = gsap.to(navbar, {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.inOut",
          });
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mega menu animation
  useEffect(() => {
    if (!megaMenuRef.current) return;

    if (activeMegaMenu) {
      gsap.fromTo(
        megaMenuRef.current,
        {
          opacity: 0,
          y: -10,
          display: "none",
        },
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

  const handleMouseEnter = useCallback(
    (menuData: MegaMenuItems, itemTitle: string) => {
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
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setActiveMegaMenu(null);
  }, []);

  return (
    <>
      <header
        className={`w-full  py-30 fixed top-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        }`}
        ref={navbarRef}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-10xl flex justify-center">
            <div className="flex justify-between gap-80 items-center h-20 ">
              {/* Logo */}
              <div className="relative md:landscape:w-98 md:landscape:h-98 cursor-pointer">
                <Image
                  src="/images/logogwk.svg"
                  alt="Buy Ticket"
                  priority
                  fill
                  className="object-contain"
                />
              </div>
              {/* Desktop Navigation */}
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
                      className={`group flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
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
              <div className="relative md:landscape:w-98 md:landscape:h-98 cursor-pointer">
                <Image
                  src="/images/image-buy-ticket.png"
                  alt="Buy Ticket"
                  priority
                  fill
                  className="object-contain"
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <nav className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={handleLinkClick}
                >
                  {item.title}
                </Link>
              ))}
              <Link
                href="/tickets"
                className="block mt-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-center px-6 py-3 rounded-full font-medium shadow-lg"
                onClick={handleLinkClick}
              >
                Buy Tickets
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Mega Menu Dropdown */}
      <div
        ref={megaMenuRef}
        className="fixed top-80 left-0 right-0 z-[999] bg-white border-t border-gray-100 shadow-xl hidden"
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
                      className="group flex flex-col py-3 rounded-lg hover:bg-gray-50 px-3 transition-all duration-200"
                      onClick={handleLinkClick}
                    >
                      <span className="text-gray-900 font-medium group-hover:text-amber-600 transition-colors duration-200">
                        {subPage.title}
                      </span>
                      {subPage.description && (
                        <span className="text-sm text-gray-500 mt-0.5">
                          {subPage.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Content */}
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl p-6 h-full text-white shadow-xl">
                  <div className="flex flex-col justify-between h-full min-h-[200px]">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {activeMegaMenu.featuredTitle}
                      </h3>
                      <p className="text-sm text-amber-100 mb-6 leading-relaxed">
                        {activeMegaMenu.featuredDescription}
                      </p>

                      {/* Updated Location & Visitor Info Section */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="flex items-center gap-3 mb-3">
                          <MapPin
                            className="text-white"
                            size={24}
                            strokeWidth={1.75}
                          />
                          <div>
                            <p className="text-sm font-medium text-white">
                              Garuda Wisnu Kencana
                            </p>
                            <p className="text-xs text-amber-100">
                              Ungasan, Bali
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="text-center">
                            <p className="text-white font-semibold">
                              {activeMegaMenu.stats.left.value}
                            </p>
                            <p className="text-amber-100">
                              {activeMegaMenu.stats.left.label}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-semibold">
                              {activeMegaMenu.stats.center.value}
                            </p>
                            <p className="text-amber-100">
                              {activeMegaMenu.stats.center.label}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-semibold">
                              {activeMegaMenu.stats.right.value}
                            </p>
                            <p className="text-amber-100">
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
    </>
  );
};

export default Navbar;
