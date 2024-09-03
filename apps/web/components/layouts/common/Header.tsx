import BaseLogo from "@/components/base/BaseLogo";
import BaseMenuImg from "@/components/base/BaseMenuImg";
import SideMenu from "@/components/layouts/common/SideMenu";
import Feature from "@/components/shared/Feature";
import BaseMenu from "@/components/shared/Menu";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`w-full mx-auto ${className}`}>
      <nav className="px-4 pt-3 min-[845px]:pt-7 transition-all justify-between">
        <div className="flex justify-between">
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
