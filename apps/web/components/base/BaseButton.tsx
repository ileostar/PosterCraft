import { cn } from "@/lib/utils";

interface BaseButtonProps {
  className?: string;
  children: React.ReactNode;
  isStatic?: boolean;
  onClick?: () => void;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  isStatic = false,
  className,
  children,
  onClick,
}) => {
  return isStatic ? (
    <div
      className={cn(
        "inline-block rounded-xl bg-rose-400 dark:bg-[#E730CA] px-3 py-2 font-semibold text-sm xl:text-base text-white text-center border border-transparent focus-visible:outline-none focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-transparent transition-colors cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  ) : (
    <div
      className={cn(
        "rounded-xl px-3 py-2 font-semibold text-sm xl:text-base text-center hover:text-white border border-rose-400 dark:border-[#E730CA]  border-solid hover:bg-rose-400 dark:hover:bg-[#E730CA] focus-visible:outline-none focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-transparent transition-colors bg-transparent text-rose-400 dark:text-[#E730CA] cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BaseButton;
