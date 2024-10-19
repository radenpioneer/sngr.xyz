import type { FC } from 'react'
import type { CollectionEntry } from 'astro:content'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
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
      header: 'Year',
      cell: (cell) => cell.getValue()?.getFullYear()
    }),
    columnHelper.accessor('data.title', {
      header: 'Project',
      cell: (cell) => cell.getValue()
    }),
    columnHelper.accessor('data.madeAt', {
      header: 'Made At',
      cell: (cell) => cell.getValue()
    }),
    columnHelper.accessor('data.builtWith', {
      header: 'Built with',
      cell: (cell) => (
        <ul className='flex items-center gap-1 text-sm'>
          {cell.getValue()?.map((entry, i, arr) => (
            <>
              <li>{entry.name}</li>
              {i < arr.length - 1 ? <span>&bull;</span> : null}
            </>
          ))}
        </ul>
      )
    }),
    columnHelper.accessor('data.links', {
      header: 'Link',
      cell: (cell) => (
        <ul className='flex items-center gap-1 text-sm'>
          {cell.getValue()?.map((entry, i, arr) => (
            <>
              <li>
                <a
                  className='text-sm'
                  href={entry.url}
                  title={entry.title}
                  target='_blank'
                >
                  {entry.type === 'repository' ? (
                    <GithubIcon />
                  ) : (
                    <PublicURLIcon />
                  )}
                </a>
              </li>
              {i < arr.length - 1 ? <span>&bull;</span> : null}
            </>
          ))}
        </ul>
      )
    })
  ]

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <table className='w-full table-auto border-collapse border border-zinc-700'>
      <thead>
        {table.getHeaderGroups().map((hGroup) => (
          <tr key={hGroup.id}>
            {hGroup.headers.map((header) => (
              <th className='border border-zinc-700 px-3 py-1' key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
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
