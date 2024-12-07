import { type FC, Fragment } from 'react'
import type { Projects } from './projects.astro'
import PublicURLIcon from '~icons/material-symbols/arrow-outward-rounded'
import GithubIcon from '~icons/simple-icons/github'

export interface FeaturedProjectsProps {
  projects: Projects
}

export const FeaturedProjects: FC<FeaturedProjectsProps> = ({ projects }) => {
  return (
    <div className='flex flex-1 flex-col justify-center gap-4 py-16 sm:gap-20'>
      {projects
        .sort(() => Math.random() - 0.5)
        .map((project) => (
          <div
            className='relative flex aspect-[2360/1640] flex-col border-2 border-zinc-700 bg-zinc-100/90 px-2 py-3 shadow hover:bg-zinc-200 sm:aspect-auto sm:bg-zinc-100 sm:*:max-w-[240px] md:*:max-w-[360px]'
            key={project.id}
          >
            <div className='font-mono text-xs'>Featured Project</div>
            <h3 className='mb-2 text-xl font-extrabold'>
              <a className='hover:underline' href={`/projects/${project.id}`}>
                {project.data.title}
              </a>
            </h3>
            <div className='mb-4 min-h-[60px] flex-1 text-sm'>
              <p>{project.data.description}</p>
            </div>

            <div className='mt-auto flex flex-col gap-[0.125rem]'>
              {project.data.builtWith && (
                <div className='flex flex-wrap gap-2 font-mono text-xs'>
                  {project.data.builtWith.map((entry, i, arr) => (
                    <Fragment key={i}>
                      <span>{entry.name}</span>
                      {i < arr.length - 1 && (
                        <span className='text-xs'>&bull;</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              )}
              {project.data.links && (
                <div className='flex items-center gap-2 sm:gap-1'>
                  {project.data.links.map((entry, i, arr) => (
                    <Fragment key={i}>
                      <a
                        className='hover:text-zinc-700'
                        href={entry.url}
                        target='_blank'
                        aria-label={entry.title}
                      >
                        {entry.type === 'repository' ? (
                          <GithubIcon className='text-xl md:text-xs' />
                        ) : (
                          <Fragment>
                            <span className='mr-1 text-sm font-bold hover:underline md:text-xs'>
                              {entry.title}
                            </span>
                            <PublicURLIcon className='inline text-xl md:text-xs' />
                          </Fragment>
                        )}
                      </a>
                      {i < arr.length - 1 && (
                        <span className='text-xs'>&bull;</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
            {project.data.image && (
              <img
                className='absolute right-0 top-0 z-[-1] aspect-[2360/1640] w-full bg-zinc-50 grayscale sm:right-[16px] sm:top-[50%] sm:z-[1] sm:block sm:w-[320px] sm:translate-y-[-50%] sm:border-2 sm:border-zinc-700 sm:shadow sm:grayscale-0'
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
