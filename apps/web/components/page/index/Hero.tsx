import BaseIntro from "@/components/base/BaseIntro";
import ModelContainer from "@/components/shared/ModelContainer";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="h-[80vh] mb-14 mt-8 mx-auto max-w-7xl px-6 sm:pl-5 sm:pr-0 space-y-20 sm:space-y-52 lg:space-y-0 lg:flex lg:items-center lg:pl-8 overflow-hidden">
      <BaseIntro />
      <ModelContainer />
    </div>
  );
};

export default Hero;
