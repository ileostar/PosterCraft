import Left from "@/components/editor/Left/index";
import Right from "@/components/editor/Right";
import EditorLayout from "@/components/layouts/EditorLayout";
import Middle from "@/components/pages/editor/Middle/index";

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
