import type { FC } from 'react'
import type { ProjectsType } from './projects.astro'

interface ProjectsProps {
  projects: ProjectsType
}

const Projects: FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className='flex min-h-screen flex-col items-start justify-start gap-24 pt-[64px]'>
      <h2 className='font-heading from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-[700] uppercase text-transparent md:text-6xl'>
        Projects
      </h2>
      <div
        className='mx-auto grid w-full grid-cols-1'
        style={{ maxWidth: '1024px' }}
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
              <h3 className='font-heading text-primary text-2xl font-bold uppercase md:text-4xl'>
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
