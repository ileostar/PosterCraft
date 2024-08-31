import BaseInfo from "@/components/base/BaseInfo";

interface IntroduceProps {}

const infos = [
  {
    title: "Title",
    content: "Content",
  },
  {
    title: "Title",
    content: "Content",
  },
  {
    title: "Title",
    content: "Content",
  },
  {
    title: "Title",
    content: "Content",
  },
];

const Introduce: React.FC<IntroduceProps> = () => {
  return (
    <section className="w-full h-48 sm:p-5 mt-10 grid grid-cols-2 items-center gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-7 lg:mx-0 lg:grid-cols-4">
      {infos.map((info, index) => (
        <BaseInfo
          title={info.title}
          key={index}
        />
      ))}
    </section>
  );
};

export default Introduce;
