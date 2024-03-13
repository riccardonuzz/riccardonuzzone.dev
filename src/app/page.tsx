import { WindowCard } from "@/components/window-card/window-card";
import Image from "next/image";

import data from './../data.json'
import SkillsSection from "@/components/skills-section/skills-section";
import ExperiencesSection from "@/components/experiences-section/experiences-section";


const Home = () => {
  return (
    <main className="w-full h-screen max-md:h-full max-md:overflow-y-hidden overflow-y-auto overflow-x-hidden max-lg:p-10 max-2xl:p-10 pl-20 pr-44 pt-32 scrollbar">
      <section className='grid grid-cols-12 gap-6 p-5 h-screen' id='introduction'>
        <div className="col-span-5 max-lg:col-span-12">
          <WindowCard title='biography' defaultOpen enableControls>
            <div>
              Experienced with all stages of the development cycle for dynamic web projects with AGILE methodologies.
              Well-versed in numerous programming languages, frameworks and libraries such as JavaScript (ES6+) <Image className="inline" width={15} height={15} src='/js.png' alt='JavaScript' /> <Image className="inline" width={15} height={15} src='/ecmascript.png' alt='EcmaScript' />, TypeScript <Image className="inline" width={15} height={15} src='/typescript.svg' alt='TypeScript' />, React <Image className="inline" width={15} height={15} src='/react.png' alt='React' /> and Angular <Image className="inline" width={20} height={20} src='/angular.png' alt='Angular' />.
            </div>
          </WindowCard>
        </div>
        <div className="col-span-7 max-lg:col-span-12">
          <WindowCard title='skills' defaultOpen enableControls>
            <SkillsSection skills={data.skills} />
          </WindowCard>

        </div>
      </section>

      <section className="p-5">
        <h1 className="text-3xl mb-7 text-end">Professional experiences</h1>
        <ExperiencesSection experiences={data.experiences} />
      </section>
    </main>
  );
}

export default Home