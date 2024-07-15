import type { FC, PropsWithChildren } from 'react'
import type { CollectionEntry } from 'astro:content'
import type { GetImageResult } from 'astro'

export interface HeroSectionProps {
  site: CollectionEntry<'site'>
  logo: GetImageResult
}

export const HeroSection: FC<PropsWithChildren<HeroSectionProps>> = ({
  site,
  logo,
  children
}) => (
  <section className='prose mt-8 flex min-h-screen max-w-none flex-col items-center gap-4 md:prose-lg md:justify-center md:gap-8'>
    <hgroup className='not-prose flex w-full flex-row-reverse items-center justify-end gap-4'>
      <h1 className='text-2xl font-bold md:text-4xl'>{site.data.title}</h1>
      <img
        className='w-[35px] rounded-full md:w-[80px]'
        src={logo.src}
        srcSet={logo.srcSet.attribute}
        {...logo.attributes}
      />
    </hgroup>
    {children}
  </section>
)
