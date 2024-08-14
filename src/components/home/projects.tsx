import type { FC, HTMLAttributes } from 'react'
import type { ProjectsType } from './projects.astro'

interface ProjectsProps extends HTMLAttributes<HTMLElement> {
  projects: ProjectsType
}

const Projects: FC<ProjectsProps> = ({ projects, ...props }) => {
  return (
    <section
      className='flex min-h-screen flex-col items-start justify-start gap-8 pt-[64px]'
      {...props}
    >
      <h2 className='font-heading from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-[700] uppercase text-transparent sm:text-3xl md:text-4xl'>
        Projects
      </h2>
      <div
        className='mx-auto grid w-full grid-cols-1 gap-8'
        style={{ maxWidth: '768px' }}
      >
        {projects.map((project, _i) => (
          <article
            className='flex flex-col gap-2 sm:flex-row sm:gap-4 md:gap-6'
            key={_i}
          >
            <a href={`/projects/${project.slug}`}>
              <img
                {...project.data.image.attributes}
                className='border-muted aspect-[4/3] w-full rounded-xl border object-cover sm:w-[240px]'
                src={project.data.image.src}
                srcSet={project.data.image.srcSet.attribute}
                alt={project.data.name}
              />
            </a>
            <div className='flex flex-1 flex-col gap-2'>
              <h3 className='font-heading text-primary text-2xl font-bold uppercase md:text-2xl'>
                <a href={`/projects/${project.slug}`}>{project.data.name}</a>
              </h3>
              <p>{project.data.description}</p>
              {project.data.technologies && (
                <ul className='flex gap-1 sm:mt-auto'>
                  {project.data.technologies.map((item, _i) => (
                    <li
                      className='text-secondary bg-secondary/[.15] border-secondary rounded-full border py-1 px-2 text-sm'
                      key={_i}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
