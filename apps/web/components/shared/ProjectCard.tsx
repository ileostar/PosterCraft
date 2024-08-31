import "@/style/project-card.css";

interface ProjectCardProps {}

const ProjectCard: React.FC<ProjectCardProps> = () => {
  return (
    <div className="custom-card w-96 h-64">
      <div className="custom-border"></div>
      <div className="content">
        <div className="logo">
          <div className="logo1">
            <span className="text-[#E730CA] font-mono text-2xl font-bold">Poster</span>
          </div>
          <div className="logo2">
            <span className="text-white/80 font-mono text-2xl font-bold">Craft</span>
          </div>
          <span className="trail"></span>
        </div>
        <span className="logo-bottom-text">LeoStar</span>
      </div>
      <span className="bottom-text">poster-craft</span>
    </div>
  );
};

export default ProjectCard;
