import { cn } from "@/lib/utils";
import { Link } from "@/utils/i18n/routing";

interface GoHomepageProps {
  className?: string;
}

const GoHomepage: React.FC<GoHomepageProps> = ({ className }) => {
  return (
    <Link
      href="/"
      className={cn("text-white hover:text-white/80", className)}
    >
      Go Homepage
    </Link>
  );
};

export default GoHomepage;
