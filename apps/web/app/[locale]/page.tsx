import Hero from "@/components/home/Hero";
import Introduce from "@/components/home/Introduce";
import TemplateList from "@/components/home/TemplateList";
import WorksList from "@/components/home/WorksList";
import BaseLayout from "@/layouts/BaseLayout";

function Main() {
  return (
    <BaseLayout>
      <Hero />
      <Introduce />
      <TemplateList />
      <WorksList />
    </BaseLayout>
  );
}

export default Main;
