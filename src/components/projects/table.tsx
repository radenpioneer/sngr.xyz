import { type FC, useState } from 'react'
import type { ProjectsDataType } from './table.astro'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

export interface ProjectsTableData {
  data: ProjectsDataType
}

const columnHelper = createColumnHelper<ProjectsDataType[0]>()
const columns = [
  columnHelper.accessor('name', {
    cell: (prop) => prop.getValue()
  }),
  columnHelper.accessor('status', {
    cell: (prop) => prop.getValue()
  })
]

const ProjectsTable: FC<ProjectsTableData> = ({ data: tableData }) => {
  const [data] = useState(() => [...tableData])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <table className='border-muted w-full table-auto border-collapse border'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th className='border-muted border' key={header.id}>
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
              <td className='border-muted border' key={cell.id}>
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
