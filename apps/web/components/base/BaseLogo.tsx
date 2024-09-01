import Image from "next/image";

const BaseLogo: React.FC = () => {
  return (
    <div className="flex w-72">
      <div className="logo flex flex-shrink-0 items-center text-white hover:text-[#E730CA] transition-colors">
        <Image
          src="/favicon.png"
          className="hidden md:block logo-svg transform hover: transition-transform duration-700 will-change-transform"
          width="52"
          height="44"
          alt="Poster Craft Logo"
        />
        <Image
          src="/favicon.png"
          className="md:hidden"
          width="37"
          height="31"
          alt="Poster Craft Logo"
        />
      </div>
    </div>
  );
};

export default BaseLogo;
