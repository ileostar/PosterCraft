interface EditorNameProps {
  name: string;
}

const EditorName: React.FC<EditorNameProps> = ({ name = "未命名作品" }) => {
  return <div className="text-xl font-bold">{name}</div>;
};

export default EditorName;
