import { useState, useRef, useEffect } from 'react'
import { FiFilter, FiCheck } from 'react-icons/fi'
import './FilterDropdown.css'

export default function FilterDropdown({ column, options }) {
  const [open, setOpen] = useState(false)
  const selected = column.getFilterValue() || []
  const btnRef = useRef(null)
  const dropdownRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      let left = rect.left
      if (left + 200 > window.innerWidth) {
        left = window.innerWidth - 210
      }
      if (left < 10) left = 10
      setPosition({
        top: rect.bottom + 4,
        left: left,
      })
    }
  }, [open])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const toggle = (value) => {
    const newVal = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value]
    column.setFilterValue(newVal.length ? newVal : undefined)
  }

  const clearAll = () => {
    column.setFilterValue(undefined)
  }

  return (
    <div className="filter-wrapper">
      <button ref={btnRef} className={`filter-trigger ${selected.length ? 'has-filter' : ''}`} onClick={() => setOpen(!open)} type="button">
        <FiFilter size={14} />
        {selected.length > 0 && <span className="filter-count">{selected.length}</span>}
      </button>
      
      {open && (
        <div ref={dropdownRef} className="filter-menu" style={{ top: position.top, left: position.left }}>
          <div className="filter-header">
            <span>Filter</span>
            {selected.length > 0 && (
              <button className="clear-btn" onClick={clearAll}>Clear</button>
            )}
          </div>
          <div className="filter-options">
            {options.map(opt => (
              <label key={opt} className="filter-item">
                <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)}/>
                <span className="checkmark">
                  <FiCheck size={12} />
                </span>
                <span className="filter-label">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
