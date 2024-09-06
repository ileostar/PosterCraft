import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";

interface LogoProps {
  [index: string]: unknown;
  className?: string;
  size?: "small" | "large";
}

const BaseLogo: React.FC<LogoProps> = ({ size = "large", className, ...props }) => {
  return (
    <Link
      href="/"
      className={cn("flex cursor-pointer", className)}
      {...props}
    >
      <div className="logo flex flex-shrink-0 items-center text-white hover:text-[#E730CA] transition-colors">
        <Image
          src="/favicon.png"
          className="hidden md:block logo-svg transform hover: transition-transform duration-700 will-change-transform"
          width={size === "small" ? 32 : 52}
          height={size === "small" ? 28 : 44}
          alt="Poster Craft Logo"
        />
        <Image
          src="/favicon.png"
          className="md:hidden"
          width={size === "small" ? 32 : 52}
          height={size === "small" ? 28 : 44}
          alt="Poster Craft Logo"
        />
      </div>
    </Link>
  );
};

export default BaseLogo;
