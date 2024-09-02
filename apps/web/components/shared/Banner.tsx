import { cn } from "@/lib/utils";

interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className }) => {
  return <div className={cn("w-full h-20", className)}>Banner</div>;
};

export default Banner;
