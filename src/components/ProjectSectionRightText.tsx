interface ProjectSectionProps {
  title: string;
  description: string;
  videoUrl: string;
  bgColor: string;

}

export default function ProjectSectionRightText({
  title,
  description,
  videoUrl,
  bgColor,

}: ProjectSectionProps) {
  return (
    <section className={`${bgColor} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            className="w-full rounded-lg shadow-lg border border-neon-blue/20"
          />
        </div>
        <div className="text-neon-blue">
          <h2 className="text-4xl font-bold text-neon-green mb-4">{title}</h2>
          <p className="text-lg">{description}</p>

         
        </div>
      </div>
    </section>
  );
}
