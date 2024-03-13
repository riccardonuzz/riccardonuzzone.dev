import Link from 'next/link'
import styles from './side-menu.module.css'
import Image from 'next/image'
import { SlPaperPlane, SlSocialGithub, SlSocialLinkedin } from 'react-icons/sl'

const SideMenu = () => {
  return (
    <aside className='flex flex-col justify-center items-center w-full max-md:h-screen relative'>
      <div className='flex flex-col items-end max-md:items-center max-md:pt-5'>
        <span className="text-[16px] mr-1 d-inline-block">Riccardo Nuzzone</span>
        <h1 className="text-8xl m-0 p-0 leading-[0.7] font-bold">
          RN
        </h1>

        <span className={styles.typewriter}>
          <p className="text-lg pl-2 pr-0 max-lg:text-base">Senior Front-End developer</p>
        </span>

        <menu className='pl-2 mt-8 text-xl text-end z-0 max-md:text-center'>
          <li className='transition ease-in-out hover:text-yellow-500'><Link href='/#introduction'>introduction /</Link></li>
          <li className='text-white/45 transition ease-in-out hover:text-yellow-500'><Link href='/#biography'>professional experiences /</Link></li>
          <li className='text-white/45 transition ease-in-out hover:text-yellow-500'><Link href='/#biography'>personal projects /</Link></li>
        </menu>

        <div className='mt-10'>
          <Link href='https://github.com/riccardonuzz'>
            <SlSocialGithub className='inline mr-4 hover:text-yellow-500' size='2em' />
          </Link>
          <Link href='http://www.linkedin.com/in/riccardo-nuzzone-5627b8b8'>
            <SlSocialLinkedin className='inline mr-4 hover:text-yellow-500' size='2em' />
          </Link>
          <Link href='mailto:riccadonuzz@yahoo.it'>
            <SlPaperPlane className='inline hover:text-yellow-500' size='2em' />
          </Link>
        </div>

      </div>
      <Image
        className='max-md:flex md:hidden absolute bottom-0'
        src='/scroll-down-mouse.webp'
        alt='scroll down'
        width={50}
        height={50}
      />
    </aside>
  )
}

export default SideMenu