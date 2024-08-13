import type { FC, HTMLAttributes } from 'react'
import type { ProjectsType } from './projects.astro'

interface ProjectsProps extends HTMLAttributes<HTMLElement> {
  projects: ProjectsType
}

const Projects: FC<ProjectsProps> = ({ projects, ...props }) => {
  return (
    <section
      className='flex min-h-screen flex-col items-start justify-start gap-16 pt-[64px]'
      {...props}
    >
      <h2 className='font-heading from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-[700] uppercase text-transparent sm:text-3xl md:text-4xl'>
        Projects
      </h2>
      <div
        className='mx-auto grid w-full grid-cols-1'
        style={{ maxWidth: '768px' }}
      >
        {projects.map((project, _i) => (
          <article className='flex gap-6' key={_i}>
            <a href={`/projects/${project.slug}`}>
              <img
                {...project.data.image.attributes}
                className='aspect-[4/3] w-full object-cover'
                src={project.data.image.src}
                srcSet={project.data.image.srcSet.attribute}
                alt={project.data.name}
              />
            </a>
            <div className='flex flex-1 flex-col'>
              <h3 className='font-heading text-primary text-xl font-bold uppercase md:text-2xl'>
                <a href={`/projects/${project.slug}`}>{project.data.name}</a>
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
