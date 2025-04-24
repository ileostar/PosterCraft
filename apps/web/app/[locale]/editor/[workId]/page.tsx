import Left from "@/components/editor/Left/index";
import Middle from "@/components/editor/Middle/index";
import Right from "@/components/editor/Right";
import EditorLayout from "@/components/layouts/EditorLayout";

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
