interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <article
      className={`overflow-hidden w-full lg:w-[33%] bg-background/30 max-w-7xl relative flex flex-col rounded-xl saturate-100 backdrop-blur-[10px] bg-clip-border text-gray-700 shadow-feature-card dark:shadow-feature-card-dark ${className}`}
    >
      {children}
    </article>
  );
};
