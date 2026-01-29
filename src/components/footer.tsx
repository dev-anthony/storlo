'use client';

import {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ArrowLeftRight,
  Home,
  Grid3x3,
  ShoppingBag,
  User,
} from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-white">
      {/* Main Footer */}
        <div className="mx-auto w-auto px-16 py-16 max-w-full">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-6">

                {/* Brand Column */}
                <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2 text-xl font-semibold text-blue-600">
                <Image src="/vector1.png" alt="Storlo Logo" width={80} height={40} priority />
            </div>

            <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-500">
                Storlo is a modern online platform built to help buyers and sellers
                connect, trade, and grow with confidence. We focus on transparency,
                security, and tools that make digital commerce simple and reliable.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                Linkedin,
                Instagram,
                Facebook,
                Twitter,
                Youtube,
              ].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
                </div>

                {/* Links */}
                <FooterColumn
                title="Company"
                links={['About Us', 'Careers', 'Blogs', 'Contact']}
                />

                <FooterColumn
                title="For Buyers"
                links={[
                    'How it Works',
                    'Buyer Protection',
                    'Order Tracking',
                    'Help Centre',
                ]}
                />

                <FooterColumn
                title="For Sellers"
                links={[
                    'Seller Dashboard',
                    'Seller Guidelines',
                    'Fees & Payouts',
                    'Seller Support',
                ]}
                />

                <FooterColumn
                title="Legal & Trust"
                links={[
                    'Terms of Service',
                    'Privacy Policy',
                    'Refund Policy',
                ]}
                />
            </div>
        </div>

      {/* Bottom Bar */}
        <div className="bg-blue-600">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-white">
                <span>© 2026 Marketplace. All rights reserved.</span>
                <span>Secure transactions. Verified sellers. Built for scale.</span>
            </div>
        </div>

      {/* Mobile Navigation - Only visible on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around px-4 py-4">
          <MobileNavItem icon={Home} label="Home" />
          <MobileNavItem icon={Grid3x3} label="Categories" />
          <MobileNavItem icon={ShoppingBag} label="Shop" />
          <MobileNavItem icon={User} label="Profile" />
        </div>
      </nav>
    </footer>
  );
}

/* Helper Component */
function MobileNavItem({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href="#"
      className="flex flex-col items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 transition"
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: string[];
}) {
    return (
    <div>
        <h4 className="mb-4 text-sm font-semibold text-gray-900">
            {title}
        </h4>
        <ul className="space-y-3">
            {links.map((link) => (
                    <li key={link}>
                <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 transition"
                >
                    {link}
                </a>
            </li>
            ))}
        </ul>
    </div>
    );
}
