import { type FC, Fragment } from 'react'
import type { TableData } from './table'
import PublicURLIcon from '~icons/material-symbols/arrow-outward-rounded'
import GithubIcon from '~icons/simple-icons/github'

type Links = TableData['data']['links']

export const ProjectsLinksList: FC<{ links: Links }> = ({ links }) => {
  return (
    <ul className='flex w-full items-center gap-1'>
      {links?.map((entry, i, arr) => (
        <Fragment key={i}>
          <li>
            <a
              className='whitespace-nowrap'
              href={entry.url}
              title={entry.title}
              aria-label={entry.title}
              target='_blank'
            >
              {entry.type === 'repository' ? (
                <GithubIcon className='text-xl md:text-sm' />
              ) : (
                <Fragment>
                  <span className='font-mono hover:underline md:text-sm'>
                    {entry.title}
                  </span>
                  <PublicURLIcon className='ml-[0.125rem] inline text-xl md:text-sm' />
                </Fragment>
              )}
            </a>
          </li>
          {i < arr.length - 1 ? <span className='text-xs'>&bull;</span> : null}
        </Fragment>
      ))}
    </ul>
  )
}
