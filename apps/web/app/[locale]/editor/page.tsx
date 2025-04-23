import Left from "@/components/editor/Left/index";
import Middle from "@/components/editor/Middle/index";
import Right from "@/components/editor/Right";
import EditorLayout from "@/layouts/EditorLayout";

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
