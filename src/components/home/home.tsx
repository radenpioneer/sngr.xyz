import { type FC } from 'react'
import type { CollectionEntry } from 'astro:content'

interface HomeProps {
  site: CollectionEntry<'site'>
}

const Home: FC<HomeProps> = ({ site }) => {
  //   const lines = useState([
  //     'is a professional web developer.',
  //     'is building things for the web.',
  //     'also doing fullstack development.',
  //     'is crying from unemployment.',
  //     'doesn\'t yet have a wife.'
  //   ])

  return (
    <section className='*:font-heading flex flex-1 flex-col items-start justify-center *:font-[700] *:break-all'>
      <h1 className='from-primary to-secondary bg-gradient-to-r bg-clip-text text-6xl uppercase text-transparent md:text-8xl xl:text-9xl'>
        {site.data.name}
      </h1>
      <p className='text-muted text-5xl md:text-6xl xl:text-7xl'>
        is crying from unemployment.
      </p>
    </section>
  )
}

export default Home
