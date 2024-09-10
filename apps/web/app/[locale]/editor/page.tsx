import EditorLayout from "@/components/layouts/EditorLayout";
import Left from "@/components/pages/editor/Left/index";
import Middle from "@/components/pages/editor/Middle/index";
import Right from "@/components/pages/editor/Right";

function Main() {
  return (
    <EditorLayout>
      <Left />
      <Middle />
      <Right />
    </EditorLayout>
  );
}

export default Main;
