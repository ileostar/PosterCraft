import { cn } from "@/lib/utils";
import { Link } from "@/utils/i18n/routing";

interface MenuItemProps {
  href?: string;
  ClassName: string;
  text: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, ClassName, text, onClick }) => {
  const commonClasses =
    "flex cursor-pointer items-center gap-3 rounded-xl hover:bg-gray-300/20 px-2 py-1";
  const iconAndTextClasses = "text-gray-600/80 dark:text-gray-300/70 text-lg font-medium";

  return href ? (
    <Link
      href={href}
      className={commonClasses}
    >
      <span className={cn(`h-7 w-7 ${iconAndTextClasses} font-bold`, ClassName)}></span>
      <span className={iconAndTextClasses}>{text}</span>
    </Link>
  ) : (
    <div
      className={commonClasses}
      onClick={onClick}
    >
      <span className={cn(`h-7 w-7 ${iconAndTextClasses} font-bold`, ClassName)}></span>
      <span className={iconAndTextClasses}>{text}</span>
    </div>
  );
};

export default MenuItem;
