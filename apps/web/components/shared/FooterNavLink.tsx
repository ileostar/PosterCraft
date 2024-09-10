import { Link } from "@/utils/i18n/routing";

interface FooterNavLinkProps {
  href: string;
  label: string;
}

const FooterNavLink: React.FC<FooterNavLinkProps> = ({ href, label }) => {
  return (
    <div className="pb-6">
      <Link
        href={href}
        className="text-sm leading-6 text-white dark:text-gray-600 hover:text-gray-400"
      >
        {label}
      </Link>
    </div>
  );
};

export default FooterNavLink;
