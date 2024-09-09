import BaseLayout from "@/components/layouts/BaseLayout";

interface DetailProps {
  params: {
    id: string;
  };
}

const Detail: React.FC<DetailProps> = ({ params }) => {
  return (
    <BaseLayout>
      <div className="h-[100vh]">
        当前页面ID：
        {params.id}
      </div>
    </BaseLayout>
  );
};

export default Detail;
