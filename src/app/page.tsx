import data from './../data.json'
import ExperiencesSection from "@/components/sections/experiences-section/experiences-section";
import IntroductionSection from "@/components/sections/introduction-section/introduction-section";
import PersonalProjectsSection from '@/components/sections/personal-projects-section/personal-projects-section';


const Home = () => {
  return (
    <main className="w-full h-screen max-md:h-full max-md:overflow-y-hidden overflow-y-auto overflow-x-hidden max-lg:p-10 max-2xl:p-10 pr-44 scrollbar">
      <section id='introduction' className='h-auto xl:h-screen flex flex-col justify-center items-center'>
        <IntroductionSection skills={data.skills} />
      </section>

      <section id='work-experiences' className='pt-20'>
        <h1 className="text-3xl mb-7 text-end">work experiences /</h1>
        <ExperiencesSection experiences={data.experiences} />
      </section>

      <section id="personal-projects" className="pt-20">
        <h1 className="text-3xl mb-7 text-end">personal projects /</h1>
        <PersonalProjectsSection projects={data.projects} />
      </section>

      <footer className='text-center mb-4'>Made with 🧡 by Riccardo Nuzzone using Next.js and React </footer>
    </main>
  )
}

export default Home