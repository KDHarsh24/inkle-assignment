import { useMemo } from 'react'
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import FilterDropdown from '../FilterMenu/FilterDropdown'
import { FaEdit } from 'react-icons/fa'
import getUniqueValues from '../../utils/getUniqueValues'
import './DataTable.css'

export default function DataTable({ data, onEdit, columnFilters, setColumnFilters }) {
  const genderOptions = useMemo(() => 
    getUniqueValues(data, 'gender'),
    [data]
  )

  const countryOptions = useMemo(() => 
    getUniqueValues(data, 'country'),
    [data]
  )

  // Multi-select filter function
  const multiSelectFilter = (row, columnId, filterValue) => {
    if (!filterValue || filterValue.length === 0) return true
    const cellValue = String(row.getValue(columnId) || '').toLowerCase()
    return filterValue.some(v => v.toLowerCase() === cellValue)
  }

  const columns = useMemo(() => [
    {
      accessorFn: row => row.name || row.entity || '',
      id: 'entity',
      header: 'Entity',
      cell: info => <span className="cell-entity">{info.getValue()}</span>,
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => (
        <div className="th-with-filter">
          <span>Gender</span>
          <FilterDropdown column={column} options={genderOptions} />
        </div>
      ),
      cell: info => {
        const val = info.getValue()
        if (!val) return <span className="cell-empty">-</span>
        const normalized = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
        return <span className={`badge badge-${val.toLowerCase()}`}>{normalized}</span>
      },
      filterFn: multiSelectFilter,
    },
    {
      accessorKey: 'requestDate',
      header: 'Request Date',
      cell: info => info.getValue() || <span className="cell-empty">-</span>,
    },
    {
      accessorKey: 'country',
      header: ({ column }) => (
        <div className="th-with-filter">
          <span>Country</span>
          <FilterDropdown column={column} options={countryOptions} />
        </div>
      ),
      filterFn: multiSelectFilter,
    },
    {
      id: 'actions',
      header: 'Edit',
      cell: info => (
        <button className="action-edit" onClick={() => onEdit(info.row.original)}>
          <FaEdit size={20} />
        </button>
      ),
    },
  ], [genderOptions, countryOptions, onEdit])

  const table = useReactTable({ data, columns, state: { columnFilters }, onColumnFiltersChange: setColumnFilters, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel()})
  const numFlexible = columns.filter(c => c.id !== 'actions').length || 1
  const flexPercent = Math.floor(100 / numFlexible)

  return (
    <div className="table-container">
      <table className="data-table">
        {/* fix actions column width and give equal percent width to others */}
        <colgroup>
          {columns.map(col => (
            <col
              key={col.id || col.accessorKey || col.header}
              style={{ width: col.id === 'actions' ? '64px' : `${flexPercent}%` }}
            />
          ))}
        </colgroup>
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty-row">
                No records found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
