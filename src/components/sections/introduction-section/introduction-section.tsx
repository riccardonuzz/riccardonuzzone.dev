import SkillsSection from "@/components/skills-section/skills-section"
import { WindowCard } from "@/components/window-card/window-card"
import { Technology } from "@/types/data"
import Image from "next/image";


interface IntroductionSectionProps {
    skills: Technology[]
}

const IntroductionSection = ({ skills }: IntroductionSectionProps) => {
    return (
        <div className="grid grid-cols-12 xl:gap-12 items-center justify-center">
            <div className="col-span-5 max-xl:col-span-12 max-xl:pb-10 flex justify-center items-center text-center">
                <video
                    preload="none"
                    autoPlay
                    muted
                    loop
                    width={500}
                    height={500}
                >
                    <source src="/fedeveloper.webm" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="col-span-7 max-xl:col-span-12">
                <div className="mb-6">
                    <WindowCard title='biography' defaultOpen enableControls>
                        <div>
                            Experienced with all stages of the development cycle for dynamic web projects with AGILE methodologies.
                            Well-versed in numerous programming languages, frameworks and libraries such as JavaScript (ES6+) <Image className="inline" width={15} height={15} src='/js.png' alt='JavaScript' /> <Image className="inline" width={15} height={15} src='/ecmascript.png' alt='EcmaScript' />, TypeScript <Image className="inline" width={15} height={15} src='/typescript.svg' alt='TypeScript' />, React <Image className="inline" width={15} height={15} src='/react.png' alt='React' /> and Angular <Image className="inline" width={20} height={20} src='/angular.png' alt='Angular' />.
                        </div>
                    </WindowCard>
                </div>
                <div className="w-full">
                    <WindowCard title='skills' defaultOpen enableControls>
                        <SkillsSection skills={skills} />
                    </WindowCard>

                </div>
            </div>

        </div>
    )
}

export default IntroductionSection