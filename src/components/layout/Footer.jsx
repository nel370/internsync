import React from "react";
import { Link } from "react-router-dom";

const footerLinks = {
  Marketplace: ["All NFTs", "New", "Art", "Music", "Domain Names", "Virtual Worlds"],
  Resources: ["Help Center", "Partners", "Suggestions", "Discord", "Blog", "Newsletter"],
  Company: ["About", "Careers", "Branding", "Terms of Service", "Privacy Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">U</span>
              </div>
              <span className="text-lg font-bold text-foreground">Ultraverse</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ultraverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}