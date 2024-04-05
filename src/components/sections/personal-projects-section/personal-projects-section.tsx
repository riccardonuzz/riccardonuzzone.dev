import SkillsSection from "@/components/skills-section/skills-section"
import { WindowCard } from "@/components/window-card/window-card"
import { PersonalProject } from "@/types/data"
import Image from 'next/image'



interface PersonalProjectsSectionProps {
    projects: PersonalProject[]
}

const PersonalProjectsSection = ({ projects }: PersonalProjectsSectionProps) => {
    const renderProjects = () => {
        return projects.map(project => {
            return (
                <div key={project.name} className="pb-6">
                    <WindowCard title={project.name} defaultOpen enableControls={false}>
                        <div>
                            <div className="grid grid-cols-12 gap-4">
                                <div className='col-span-2 max-lg:col-span-12'>
                                    <Image 
                                        src={project.image}
                                        height={200}
                                        width={300}
                                        alt={project.name}
                                        className="border-2 rounded-lg border-white/45"
                                    />
                                </div>
                                <div className='col-span-10 max-lg:col-span-12 text-white/70'>
                                    {project.description}
                                </div>
                            </div>
                            
                            
                            <div className="mt-6">
                                <SkillsSection skills={project.technologies} />
                            </div>
                        </div>
                    </WindowCard>
                </div>
            )
        })
    }

    return (
        <div className="xl:pl-14 pb-14">
            {renderProjects()}
        </div>
    )
}

export default PersonalProjectsSection