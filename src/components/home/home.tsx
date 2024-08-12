import { type FC, useRef } from 'react'
import type { CollectionEntry } from 'astro:content'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import TextPlugin from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

interface HomeProps {
  site: CollectionEntry<'site'>
  liners: CollectionEntry<'liner'>
}

const Home: FC<HomeProps> = ({ site, liners }) => {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.to('#cursor', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      })

      const tlMaster = gsap.timeline({ repeat: -1 })
      liners.data.liners.forEach((line) => {
        const tlLine = gsap.timeline({ yoyo: true, repeat: 1, repeatDelay: 3 })
        tlLine.to('#liner', { text: line, duration: 2 })
        tlMaster.add(tlLine)
      })
    },
    { scope: ref }
  )

  return (
    <section
      className='*:font-heading flex flex-1 flex-col items-start justify-center *:font-[700] *:break-all'
      ref={ref}
    >
      <h1 className='from-primary to-secondary bg-gradient-to-r bg-clip-text text-6xl uppercase text-transparent md:text-8xl xl:text-9xl'>
        {site.data.name}
      </h1>
      <p className='text-muted text-5xl md:text-6xl xl:text-8xl'>
        <span id='liner'></span>
        <span id='cursor' className='!font-mono !font-[400]'>
          _
        </span>
      </p>
    </section>
  )
}

export default Home
