import AuthLayout from "@/components/layouts/AuthLayout";
import Left from "@/components/pages/editor/Left/index";
import Middle from "@/components/pages/editor/Middle";
import Right from "@/components/pages/editor/Right/index";

function Main() {
  return (
    <AuthLayout>
      <div className="h-screen flex flex-col">
        <div className="flex h-full">
          <Left />
          <Middle />
          <Right />
        </div>
      </div>
    </AuthLayout>
  );
}

export default Main;
