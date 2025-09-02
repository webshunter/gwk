export interface SubPage {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface MegaMenuItems {
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
export interface NavItem {
  title: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenuItems?: MegaMenuItems;
}

export const navItems: NavItem[] = [
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
          href: "/top-of-statue-tour",
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
          href: "/balinese-cultural",
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
    title: "Career",
    href: "/career",
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
