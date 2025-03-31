import { title } from "process";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface BannerProps {
  className?: string;
  title?: string;
  description?: string;
  src: string;
}

const Banner: React.FC<BannerProps> = ({ className, src, title, description }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className="text-lg text-white mt-2">{description}</p>
        </div>
      </div>
      <Image
        src={src}
        className="w-full h-full"
        alt="banner"
        width={800}
        height={200}
      />
    </div>
  );
};

export default Banner;
