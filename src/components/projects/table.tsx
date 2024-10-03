import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import type { Projects } from './table.astro'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef
} from '@tanstack/react-table'
import clsx from 'clsx/lite'

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
        <ul className='flex flex-col items-center gap-1 sm:flex-row'>
          {cell.getValue()?.map((entry, i, arr) => (
            <>
              <li key={i}>
                <Pill
                  className='cursor-pointer bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                  role='button'
                >
                  {entry.name}
                </Pill>
              </li>
              {i + 1 < arr.length && (
                <li className='text-xs text-zinc-300 max-sm:hidden' aria-hidden>
                  &bull;
                </li>
              )}
            </>
          ))}
        </ul>
      )
    }),
    columnHelper.accessor('data.status', {
      header: 'Status',
      cell: (cell) => {
        const value = cell.renderValue()
        return (
          <Pill className='flex w-max items-center gap-1 bg-zinc-200 text-zinc-700'>
            <div
              className={clsx(
                'h-[7px] w-[7px] rounded-full',
                value === 'live' && 'bg-green-500',
                value === 'progress' && 'bg-yellow-500',
                value === 'concept' && 'bg-zinc-700',
                value === 'rejected' && 'bg-red-500'
              )}
            ></div>
            {value}
          </Pill>
        )
      }
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
              <th className='border border-zinc-300 p-2' key={header.id}>
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
              <td className='border border-zinc-300 px-2 py-1' key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Pill: FC<PropsWithChildren<HTMLAttributes<HTMLSpanElement>>> = ({
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-full px-2 text-sm font-semibold uppercase',
        props.className
      )}
    >
      {children}
    </div>
  )
}

export default ProjectsTable
