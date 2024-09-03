import EditorHeader from "@/components/pages/editor/Header";

interface EditorLayoutProps {
  children: React.ReactNode;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <EditorHeader />
      <main className="flex flex-1 overflow-hidden">{children}</main>
    </div>
  );
};

export default EditorLayout;
