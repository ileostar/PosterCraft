import { navLinks, socialLinks } from "@/config/";

import FooterNavLink from "../shared/FooterNavLink";
import SocialLink from "../shared/SocialLink";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-rose-500 dark:bg-[#22252b] rounded-sm mt-24">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-12 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navLinks.map((link) => (
            <FooterNavLink
              key={link.href}
              href={link.href}
              label={link.label}
            />
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {socialLinks.map((link) => (
            <SocialLink
              key={link.href}
              href={link.href}
              srOnlyText={link.srOnlyText}
              icon={link.icon}
            />
          ))}
        </div>
        <div className="mt-10 text-center text-xs leading-5 text-white dark:text-gray-500">
          © 2024 LeoStar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
