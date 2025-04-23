import BaseLogo from "@/components/BaseLogo";
import BaseMenuImg from "@/components/BaseMenuImg";
import SideMenu from "@/components/layouts/common/SideMenu";
import Feature from "@/components/shared/Feature";
import BaseMenu from "@/components/shared/Menu";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";

interface HeaderProps {
  scroll?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className, scroll = false }) => {
  const scrolled = useScroll(100);
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-[100vw-1.5] max-h-[20vh] backdrop-blur-xl transition-all mx-auto",
        `${scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"}`,
        className,
      )}
    >
      <nav className="mx-auto max-w-7xl h-full px-4 sm:px-8 md:px-12 xl:px-0 py-3 min-[845px]:pt-[0.8rem] transition-all justify-between">
        <div className="w-full flex justify-between">
          <BaseLogo />
          <BaseMenu />
          <Feature />

          {/* 移动端侧边栏按钮 */}
          <BaseMenuImg />
        </div>
      </nav>
      {/* 兼容移动端侧边栏 */}
      <SideMenu />
    </header>
  );
};

export default Header;
