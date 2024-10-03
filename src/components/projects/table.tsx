import type { FC } from 'react'
import type { Projects } from './table.astro'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef
} from '@tanstack/react-table'

type Project = Projects[0]
interface ProjectsTableProps {
  projects: Projects
}

const ProjectsTable: FC<ProjectsTableProps> = ({ projects }) => {
  const columnHelper = createColumnHelper<Project>()
  const columns = [
    columnHelper.accessor('data.date', {
      header: 'Year',
      cell: (cell) => cell.getValue().getFullYear()
    }),
    columnHelper.accessor('data.title', {
      header: 'Project',
      cell: (cell) => (
        <a
          className='hover:underline'
          href={`/projects/${cell.row.original.id}`}
        >
          {cell.getValue()}
        </a>
      )
    }),
    columnHelper.accessor('data.madeFor', {
      header: 'Made For',
      cell: (cell) => cell.renderValue()
    }),
    columnHelper.accessor('data.builtWith', {
      header: 'Built With',
      cell: (cell) => (
        <ul className='flex items-center gap-1'>
          {cell.getValue()?.map((entry, i, arr) => (
            <>
              <li key={i}>
                <span
                  className='rounded-full bg-zinc-200 px-2 text-sm font-semibold uppercase text-zinc-700 hover:bg-zinc-300'
                  role='button'
                >
                  {entry.name}
                </span>
              </li>
              {i + 1 < arr.length && (
                <li className='text-xs text-zinc-300' aria-hidden>
                  &bull;
                </li>
              )}
            </>
          ))}
        </ul>
      )
    }),
    columnHelper.accessor('data.links', {
      header: 'Link',
      cell: (cell) => (
        <ul className='flex gap-1'>
          {cell.getValue()?.map((entry, i) => (
            <li key={i}>
              <a className='hover:underline' href={entry.url} target='_blank'>
                {entry.category}
              </a>
            </li>
          ))}
        </ul>
      )
    })
  ]

  return <ProjectsTableRender data={projects} columns={columns} />
}

const ProjectsTableRender: FC<{
  data: Projects
  columns: Array<ColumnDef<Project, any>>
}> = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <table className='w-full table-auto border-collapse border border-zinc-300'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th className='border border-zinc-300' key={header.id}>
                {!header.isPlaceholder
                  ? flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className='border border-zinc-300' key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProjectsTable
