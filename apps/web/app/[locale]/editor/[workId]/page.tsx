import EditorLayout from "@/components/layouts/EditorLayout";
import Left from "@/components/pages/editor/Left/index";
import Middle from "@/components/pages/editor/Middle/index";
import Right from "@/components/pages/editor/Right";

interface PageProps {
  params: {
    workId: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  console.log("workId", params.workId);
  return (
    <>
      <EditorLayout>
        <Left />
        <Middle />
        <Right />
      </EditorLayout>
    </>
  );
};

export default Page;
