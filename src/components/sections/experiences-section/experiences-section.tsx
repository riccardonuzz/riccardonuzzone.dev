import { Experience } from "@/types/data";
import SkillsSection from "../../skills-section/skills-section";
import { WindowCard } from "../../window-card/window-card";

export interface ExperiencesSectionProps {
  experiences: Experience[];
}

const ExperiencesSection = ({ experiences }: ExperiencesSectionProps) => {
  return experiences.map((experience) => {
    const renderProjects = experience.projects.map((project) => {
      return (
        <div key={project.name} className="mb-2">
          <div>
            <h3 className="text-lg">{project.name}</h3>
          </div>
          <p className="text-white/70">{project.description}</p>
        </div>
      );
    });

    const title = (
      <div>
        <span className="mr-2">{experience.company}</span>
        <div className="flex lg:hidden">
          <span className="text-base italic font-normal text-white/70">{`${experience.from} - ${experience.to}`}</span>
        </div>
      </div>
    );

    return (
      <div key={experience.company} className="grid grid-cols-12 mb-6">
        <div className="col-span-3 pt-3 flex justify-center max-lg:hidden">
          <span className="text-base italic text-white/70">{`${experience.from} - ${experience.to}`}</span>
        </div>
        <div className="col-span-9 max-lg:col-span-12">
          <div>
            <WindowCard title={title} defaultOpen enableControls={false}>
              <div>
                <div>{renderProjects}</div>
                <div className="mt-4">
                  <SkillsSection skills={experience.technologies} />
                </div>
              </div>
            </WindowCard>
          </div>
        </div>
      </div>
    );
  });
};

export default ExperiencesSection;
