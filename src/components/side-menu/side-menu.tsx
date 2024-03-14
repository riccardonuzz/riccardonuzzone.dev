import Link from 'next/link'
import Image from 'next/image'
import styles from './side-menu.module.css'
import { SlPaperPlane, SlSocialGithub, SlSocialLinkedin } from 'react-icons/sl'
import MenuLinks from './menu-links/menu-links'

const SideMenu = () => {
  const isActive = () => { }

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

        <MenuLinks />

        <div className='mt-10'>
          <Link href='https://github.com/riccardonuzz' aria-label='GitHub'>
            <SlSocialGithub className='inline mr-4 hover:text-yellow-500' size='2em' />
          </Link>
          <Link href='http://www.linkedin.com/in/riccardo-nuzzone-5627b8b8' aria-label='LinkedIn'>
            <SlSocialLinkedin className='inline mr-4 hover:text-yellow-500' size='2em' />
          </Link>
          <Link href='mailto:riccadonuzz@yahoo.it' aria-label='Send me an email!'>
            <SlPaperPlane className='inline hover:text-yellow-500' size='2em' />
          </Link>
        </div>

      </div>
      <Image
        className='max-md:flex md:hidden absolute bottom-10'
        src='/scroll-down-mouse.webp'
        alt='scroll down'
        width={50}
        height={50}
      />
    </aside>
  )
}

export default SideMenu