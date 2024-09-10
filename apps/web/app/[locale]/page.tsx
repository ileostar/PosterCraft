import BaseLayout from "@/components/layouts/BaseLayout";
import Hero from "@/components/pages/index/Hero";
import Introduce from "@/components/pages/index/Introduce";
import TemplateList from "@/components/pages/index/TemplateList";
import WorksList from "@/components/pages/index/WorksList";

function Main() {
  return (
    <BaseLayout>
      <Hero />
      <Introduce />
      <WorksList />
      <TemplateList />
    </BaseLayout>
  );
}

export default Main;
