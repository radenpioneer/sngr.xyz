import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import type { CollectionEntry } from 'astro:content'
import clsx from 'clsx/lite'

type Project = CollectionEntry<'projects'>

export const ProjectsPageHeader: FC<
  PropsWithChildren<HTMLAttributes<HTMLElement>>
> = ({ children, className, ...props }) => {
  return (
    <hgroup
      className={clsx(
        'relative -mx-4 flex aspect-[16/10] flex-col items-center justify-center gap-x-4 gap-y-2 border-b-2 border-t-2 border-zinc-700 px-4 py-8 sm:mx-0 sm:aspect-[16/6] sm:flex-row sm:border-4 sm:px-12 sm:shadow-md lg:px-24',
        'before:absolute before:inset-0 before:z-[-1] before:block before:h-full before:w-full before:bg-cover before:opacity-30 before:bg-blend-saturation before:[background-image:--background-image]',
        className
      )}
      {...props}
    >
      {children}
    </hgroup>
  )
}

export const ProjectsPageTitleBox: FC<{ project: Project }> = ({ project }) => {
  return (
    <div className='flex flex-1 flex-col items-center justify-start gap-[0.125rem] *:text-center sm:items-start sm:gap-1 sm:*:text-left'>
      <h1 className='text-2xl font-black sm:text-4xl xl:text-6xl'>
        {project.data.title}
      </h1>
      <p className='font-bold sm:text-lg'>
        {project.data.status.toUpperCase()}
      </p>
      {project.data.dateCompleted && (
        <p className='text-sm italic sm:text-base'>
          Finished at {project.data.dateCompleted.toLocaleDateString()}
        </p>
      )}
    </div>
  )
}
