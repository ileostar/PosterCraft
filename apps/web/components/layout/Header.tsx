import BaseFeature from "@/components/base/BaseFeature";
import BaseLogo from "@/components/base/BaseLogo";
import BaseMenu from "@/components/base/BaseMenu";
import BaseMenuImg from "@/components/base/BaseMenuImg";
import BaseSideMenu from "@/components/base/BaseSideMenu";

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
          <BaseFeature />

          {/* 移动端侧边栏按钮 */}
          <BaseMenuImg />
        </div>
      </nav>
      {/* 兼容移动端侧边栏 */}
      <BaseSideMenu />
    </header>
  );
};

export default Header;
