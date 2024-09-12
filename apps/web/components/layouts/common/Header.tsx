import BaseLogo from "@/components/base/BaseLogo";
import BaseMenuImg from "@/components/base/BaseMenuImg";
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
        "sticky top-0 z-40 w-[100vw-1.5] max-h-[20vh] backdrop-blur-xl transition-all mx-auto",
        `${scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"}`,
        className,
      )}
    >
      <nav className="mx-auto max-w-7xl min-[845px]:py-4 transition-all justify-between">
        <div className="w-full mx-4 sm:mx-8 md:mx-12 xl:mx-0 flex justify-between">
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
