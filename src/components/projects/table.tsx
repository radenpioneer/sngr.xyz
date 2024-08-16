import { type CSSProperties, type FC, useState } from 'react'
import type { ProjectsDataType } from './table.astro'
import {
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { columns } from './tableColumns'
import clsx from 'clsx'
import UpArrow from '~icons/material-symbols/keyboard-arrow-up-rounded'
import DownArrow from '~icons/material-symbols/keyboard-arrow-down-rounded'

export interface ProjectsTableData {
  data: ProjectsDataType
}

const ProjectsTable: FC<ProjectsTableData> = ({ data: tableData }) => {
  const [data] = useState(() => [...tableData])
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'deployedAt', desc: true }
  ])
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <section className='overflow-x-scroll'>
      <table className='border-muted/[.5] text-text/[.6] w-full table-fixed border-collapse border-y'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className='border-muted/[.5] w-[--col-size] border-y py-2 px-4 text-left uppercase'
                  style={
                    { '--col-size': `${header.getSize()}px` } as CSSProperties
                  }
                  key={header.id}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      role='button'
                      className={clsx([
                        'flex items-center gap-1',
                        {
                          'cursor-pointer select-none':
                            header.column.getCanSort() === true
                        }
                      ])}
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === 'asc'
                            ? 'Sort ascending'
                            : header.column.getNextSortingOrder() === 'desc'
                              ? 'Sort descending'
                              : 'Clear sort'
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{ asc: <UpArrow />, desc: <DownArrow /> }[
                        header.column.getIsSorted() as string
                      ] ?? null}
                    </div>
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
                <td
                  className='border-muted/[.5] border-y py-2 px-4'
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default ProjectsTable
