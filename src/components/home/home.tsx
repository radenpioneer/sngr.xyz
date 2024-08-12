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
      className='*:font-heading mx-auto flex min-h-screen flex-1 flex-col items-start justify-center pt-[64px] *:max-w-full *:hyphens-auto *:break-words *:font-[700]'
      style={{ maxWidth: '1280px' }}
      ref={ref}
    >
      <h1 className='from-primary to-secondary bg-gradient-to-r bg-clip-text text-5xl uppercase text-transparent md:text-7xl xl:text-8xl'>
        {site.data.name}
      </h1>
      <p className='text-muted/[0.8] text-4xl md:text-5xl xl:text-7xl'>
        <span id='liner'></span>
        <span id='cursor' className='!font-mono !font-[400]'>
          _
        </span>
      </p>
    </section>
  )
}

export default Home
