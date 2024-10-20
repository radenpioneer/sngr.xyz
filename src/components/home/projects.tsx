import { type FC, Fragment } from 'react'
import type { Projects } from './projects.astro'
import PublicURLIcon from '~icons/material-symbols/arrow-outward-rounded'
import GithubIcon from '~icons/simple-icons/github'

export interface FeaturedProjectsProps {
  projects: Projects
}

export const FeaturedProjects: FC<FeaturedProjectsProps> = ({ projects }) => {
  return (
    <div className='flex min-h-screen flex-col justify-center gap-4 py-16 sm:gap-24'>
      {projects.map((project) => (
        <div
          className='relative flex aspect-[4/3] flex-col border-2 border-zinc-700 bg-zinc-100 p-4 shadow hover:bg-zinc-200 sm:aspect-auto'
          key={project.id}
        >
          <div className='font-mono text-xs'>Featured Project</div>
          <h3 className='mb-4 text-2xl font-extrabold sm:max-w-[240px] md:max-w-[360px]'>
            {project.data.title}
          </h3>
          <p className='text-sm sm:max-w-[240px] md:max-w-[360px]'>
            {project.data.description}
          </p>
          <div className='mt-auto sm:mt-4'>
            {project.data.builtWith && (
              <div className='flex gap-2 font-mono text-xs'>
                {project.data.builtWith.map((entry, i, arr) => (
                  <Fragment key={i}>
                    <span>{entry.name}</span>
                    {i < arr.length - 1 && <span>&bull;</span>}
                  </Fragment>
                ))}
              </div>
            )}
            {project.data.links && (
              <div className='mt-2 flex gap-1 text-xl md:text-xs'>
                {project.data.links.map((entry, i, arr) => (
                  <Fragment key={i}>
                    <a href={entry.url} target='_blank'>
                      {entry.type === 'repository' ? (
                        <GithubIcon />
                      ) : (
                        <PublicURLIcon />
                      )}
                    </a>
                    {i < arr.length - 1 && <span>&bull;</span>}
                  </Fragment>
                ))}
              </div>
            )}
          </div>
          {project.data.image && (
            <img
              className='hidden w-[320px] border-2 border-zinc-700 bg-zinc-50 shadow sm:absolute sm:right-[16px] sm:top-[50%] sm:block sm:translate-y-[-50%]'
              src={project.data.image.src}
              srcSet={project.data.image.srcSet.attribute}
              {...project.data.image.attributes}
              alt=''
            />
          )}
        </div>
      ))}
    </div>
  )
}
