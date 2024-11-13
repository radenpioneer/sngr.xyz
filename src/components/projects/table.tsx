import { type FC, Fragment, useState } from 'react'
import type { CollectionEntry } from 'astro:content'
import {
  type SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx/lite'
import PublicURLIcon from '~icons/material-symbols/arrow-outward-rounded'
import GithubIcon from '~icons/simple-icons/github'

type TableData = CollectionEntry<'projects'>
interface ProjectsTableProps {
  data: Array<TableData>
}

const columnHelper = createColumnHelper<TableData>()

export const ProjectsTable: FC<ProjectsTableProps> = ({ data }) => {
  const columns = [
    columnHelper.accessor('data.dateCompleted', {
      id: 'date',
      header: 'Year',
      cell: (cell) => (
        <span className='font-mono'>{cell.getValue()?.getFullYear()}</span>
      ),
      sortingFn: 'datetime',
      sortUndefined: 'last'
    }),
    columnHelper.accessor('data.title', {
      header: 'Project',
      cell: (cell) => (
        <>
          {cell.row.original.data.page ? (
            <a
              className='font-bold hover:underline'
              href={`/projects/${cell.row.original.id}`}
            >
              {cell.getValue()}
              <PublicURLIcon className='ml-[0.125rem] inline text-xl md:text-sm' />
            </a>
          ) : (
            <span className='font-bold'>{cell.getValue()}</span>
          )}
        </>
      ),
      sortingFn: 'text'
    }),
    columnHelper.accessor('data.status', {
      header: 'Status',
      cell: (cell) => (
        <button className='w-full whitespace-nowrap text-center font-mono text-sm uppercase hover:underline'>
          {cell.getValue()}
        </button>
      ),
      sortingFn: 'text'
    }),
    columnHelper.accessor('data.madeFor', {
      header: 'Made For',
      cell: (cell) => cell.getValue(),
      sortingFn: 'text',
      sortUndefined: 'last'
    }),
    columnHelper.accessor('data.builtWith', {
      header: 'Built with',
      cell: (cell) => (
        <ul className='flex flex-wrap items-center gap-1 text-sm'>
          {cell.getValue()?.map((entry, i, arr) => (
            <Fragment key={i}>
              <li>
                <button className='font-mono hover:underline'>
                  {entry.name}
                </button>
              </li>
              {i < arr.length - 1 ? (
                <span className='text-xs'>&bull;</span>
              ) : null}
            </Fragment>
          ))}
        </ul>
      ),
      enableSorting: false
    }),
    columnHelper.accessor('data.links', {
      header: 'Link',
      cell: (cell) => (
        <ul className='flex w-full items-center gap-1'>
          {cell.getValue()?.map((entry, i, arr) => (
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
              {i < arr.length - 1 ? (
                <span className='text-xs'>&bull;</span>
              ) : null}
            </Fragment>
          ))}
        </ul>
      ),
      enableSorting: false
    })
  ]

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true }
  ])
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    state: {
      sorting
    }
  })

  return (
    <table className='w-full table-auto border-collapse border border-zinc-700'>
      <thead>
        {table.getHeaderGroups().map((hGroup) => (
          <tr className='bg-zinc-100' key={hGroup.id}>
            {hGroup.headers.map((header) => (
              <th
                className={clsx(
                  'select-none border border-zinc-700 px-3 py-1',
                  header.column.getCanSort() &&
                    'cursor-pointer hover:bg-zinc-200'
                )}
                onClick={header.column.getToggleSortingHandler()}
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {{
                  asc: <span className='ml-1 text-zinc-600'>&uarr;</span>,
                  desc: <span className='ml-1 text-zinc-600'>&darr;</span>
                }[header.column.getIsSorted() as string] ?? null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className='align-top hover:bg-zinc-200' key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className='border border-zinc-700 px-3 py-1' key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
