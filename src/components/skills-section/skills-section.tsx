import Chip from '../common/chip/chip'
import Image from 'next/image'

interface SkillsSectionProps {
    skills: { name: string, icon: string }[]
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
    const renderSkills = skills.map(skill => {
        return (
            <Chip key={skill.name}>
                {
                    skill.icon &&
                    <div className='inline mr-2 bg-white p-1 rounded-full h-7 w-7'>
                        <div className='flex items-center justify-center h-full p-1'>
                            <Image
                                src={skill.icon}
                                alt={skill.name}
                                width={12}
                                height={12}
                                className='w-auto h-auto object-contain'
                            />

                        </div>
                    </div>
                }
                <span className={skill.icon ? '' : 'pl-3'}>{skill.name}</span>
            </Chip>
        )
    })

    return (
        <div className="flex">
             <Image
                src='/caret.svg'
                alt='left'
                width={20}
                height={20}
                className='rotate-180 mb-2 md:hidden'
            />
            <div className="flex max-md:overflow-x-scroll max-md:pb-2 md:flex-wrap gap-3 text-sm text-nowrap">
                {renderSkills}
            </div>

            <Image
                src='/caret.svg'
                alt='right'
                width={20}
                height={20}
                className='mb-2 md:hidden'
            />
            
        </div>
    )
}

export default SkillsSection