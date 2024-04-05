import { PongGame } from '@/components/pong-game/pong-game'

const Page404 = () => {
  return (
    <main className='w-full h-full flex items-center flex-col p-32 max-lg:p-4'>
      <div className='w-full text-center'>
        <h1 className='text-5xl'>Whoops!</h1>
        <h2 className='text-xl'>You certainly didn&apos;t find you page but here is a good old game to enjoy 🧡</h2>
      </div>
      <div className='p-10 h-full w-full flex flex-grow min-h-80'>
        <PongGame />
      </div>
      <footer>Made with 🧡 by Riccardo Nuzzone using Next.js and React </footer>
    </main>
  )
}

export default Page404