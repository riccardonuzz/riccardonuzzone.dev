import { WindowCard } from "@/components/window-card/window-card"

const PersonalProjectsSection = () => {
    return (
        <div className="pl-14 pt-14 pb-14">
            <WindowCard title={'Example'} defaultOpen enableControls={false}>
                <div>
                    <div>
                        Example
                    </div>
                    <div className="mt-4">
                        {/* <SkillsSection skills={experience.technologies} /> */}
                    </div>
                </div>
            </WindowCard>
        </div>
    )
}

export default PersonalProjectsSection