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
                <Image
                    src={'/fedeveloper.gif'}
                    alt='Front-End Developer'
                    width={450}
                    height={450}
                />
            </div>
            <div className="col-span-7 max-xl:col-span-12">
                <div className="mb-6">
                    <WindowCard title='introduction' defaultOpen enableControls>
                        <p className="text-white/70">
                            Experienced with all stages of the development cycle for dynamic web projects with <span className="text-white">AGILE methodologies</span> .
                            Well-versed in numerous programming languages, frameworks and libraries such as <span className="text-white">JavaScript (ES6+) <Image className="inline" width={15} height={15} src='/techs/js.png' alt='JavaScript' /> <Image className="inline" width={15} height={15} src='/techs/ecmascript.png' alt='EcmaScript' />, TypeScript <Image className="inline" width={15} height={15} src='/techs/typescript.svg' alt='TypeScript' />, React <Image className="inline" width={15} height={15} src='/techs/react.png' alt='React' /> and Angular <Image className="inline" width={20} height={20} src='/techs/angular.png' alt='Angular' /></span>.
                        </p>
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