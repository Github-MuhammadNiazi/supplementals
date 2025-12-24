"use client";

import React from "react";
import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/products?category=multivitamins", label: "Multivitamins" },
    { href: "/products?category=minerals", label: "Minerals" },
    { href: "/products?category=herbal", label: "Herbal" },
    { href: "/products?category=protein", label: "Protein" },
  ],
  company: [
    { href: "/", label: "About Us" },
    { href: "/", label: "Contact" },
    { href: "/", label: "Blog" },
    { href: "/", label: "Careers" },
  ],
  support: [
    { href: "/", label: "FAQ" },
    { href: "/", label: "Shipping" },
    { href: "/", label: "Returns" },
    { href: "/", label: "Track Order" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Supplementals</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium quality supplements for your health and wellness journey.
              Transparency and quality are our core values.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@supplementals.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Health Street, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-hover hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-hover hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-hover hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Supplementals. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="transition-hover hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/" className="transition-hover hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
