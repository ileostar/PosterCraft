import Link from "next/link";

interface MenuItemProps {
  href?: string;
  iconClass: string;
  text: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, iconClass, text, onClick }) => {
  const commonClasses = "flex items-center gap-3 rounded-xl hover:bg-gray-300/20 px-2 py-1";
  const iconAndTextClasses = "text-gray-600/80 dark:text-gray-300/70 text-lg font-medium";

  return href ? (
    <Link
      href={href}
      className={commonClasses}
    >
      <span className={`${iconClass} h-7 w-7 ${iconAndTextClasses} font-bold`}></span>
      <span className={iconAndTextClasses}>{text}</span>
    </Link>
  ) : (
    <div
      className={commonClasses}
      onClick={onClick}
    >
      <span className={`${iconClass} h-7 w-7 ${iconAndTextClasses} font-bold`}></span>
      <span className={iconAndTextClasses}>{text}</span>
    </div>
  );
};

export default MenuItem;
