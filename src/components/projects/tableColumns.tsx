import type { ProjectsDataType } from './table.astro'
import OpenLinkIcon from '~icons/material-symbols/open-in-new-rounded'
import clsx from 'clsx'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<ProjectsDataType[0]>()
export const columns = [
  columnHelper.accessor('deployedAt', {
    cell: ({ cell }) => <span>{cell.getValue()?.getFullYear()}</span>,
    header: () => (
      <span>
        <strong>Year</strong>
      </span>
    ),
    size: 100,
    sortingFn: 'datetime',
    sortUndefined: 'last'
  }),
  columnHelper.accessor('name', {
    cell: ({ cell, row }) => (
      <div className='flex items-center gap-1'>
        <a
          className='text-text font-bold uppercase'
          href={`/projects/${row.original.slug}`}
        >
          {cell.getValue()}
        </a>
        {row.original.link && (
          <a className='sm:hidden' href={row.original.link} target='_blank'>
            <OpenLinkIcon className='text-sm' />
          </a>
        )}
      </div>
    ),
    header: () => (
      <span>
        <strong>Project</strong>
      </span>
    ),
    size: 300,
    sortingFn: 'text'
  }),
  columnHelper.accessor('status', {
    cell: ({ cell }) => {
      const value = cell.getValue()
      return (
        <div className='flex items-center gap-1'>
          <span
            className={clsx([
              'block h-[8px] w-[8px] rounded-full',
              { 'bg-green-500': value === 'online' },
              { 'bg-blue-500': value === 'concept' },
              { 'bg-red-500': value === 'rejected' },
              { 'bg-slate-500': value === 'archived' }
            ])}
          ></span>
          <span className='text-center uppercase'>{value}</span>
        </div>
      )
    },
    header: () => (
      <span>
        <strong>Status</strong>
      </span>
    ),
    size: 125,
    sortingFn: 'text'
  }),
  columnHelper.accessor('technologies', {
    cell: ({ cell }) => {
      const value = cell.getValue()
      if (!value) return null
      return (
        <div className='flex flex-wrap gap-1 text-sm'>
          {value.map((c, _i) => (
            <span
              className='bg-primary/[.2] border-primary text-primary text-nowrap rounded-full border py-[0.125rem] px-4'
              key={_i}
            >
              {c.name}
            </span>
          ))}
        </div>
      )
    },
    header: () => (
      <span>
        <strong>Built With</strong>
      </span>
    ),
    size: 250,
    enableSorting: false
  }),
  columnHelper.accessor('link', {
    cell: ({ cell }) => {
      const link = cell.getValue()
      if (!link) return null
      return (
        <a
          className='flex items-center gap-1 md:gap-2'
          href={link}
          target='_blank'
        >
          <span className='hover:underline'>{link}</span>
          <OpenLinkIcon className='text-sm md:text-base' />
        </a>
      )
    },
    header: () => (
      <span>
        <strong>URL</strong>
      </span>
    ),
    size: 300,
    enableSorting: false
  })
]
