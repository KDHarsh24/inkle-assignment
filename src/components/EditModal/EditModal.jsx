import { useState, useRef, useEffect } from 'react'
import { FiChevronDown, FiMapPin, FiX } from 'react-icons/fi'
import './EditModal.css'

export default function EditModal({ item, countries, onClose, onSave }) {
  const [name, setName] = useState(item.name || item.entity || '')
  const [countryId, setCountryId] = useState(item.countryId || '')
  const [saving, setSaving] = useState(false)
  
  // Custom Select State
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const selectRef = useRef(null)

  // Close select when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const country = countries.find(c => String(c.id) === String(countryId))
    await onSave({
      ...item,
      name,
      countryId,
      country: country?.name || item.country,
    })
    setSaving(false)
  }

  const selectedCountry = countries.find(c => String(c.id) === String(countryId))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Customer</h2>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
            <FiX size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name <span className="required">*</span></label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="text-input"
            />
          </div>
          
          <div className="form-field" style={{ zIndex: 10 }}>
            <label>Country</label>
            <div className="custom-select" ref={selectRef}>
              <div 
                className={`select-trigger ${isSelectOpen ? 'open' : ''}`} 
                onClick={() => setIsSelectOpen(!isSelectOpen)}
              >
                <span>{selectedCountry ? selectedCountry.name : 'Select Country'}</span>
                <FiChevronDown className="select-icon" />
              </div>
              
              {isSelectOpen && (
                <div className="select-options">
                  {countries.map(c => (
                    <div 
                      key={c.id} 
                      className={`select-option ${String(c.id) === String(countryId) ? 'selected' : ''}`}
                      onClick={() => {
                        setCountryId(c.id)
                        setIsSelectOpen(false)
                      }}
                    >
                      <div className="option-content">
                        <FiMapPin className="option-icon" />
                        <span>{c.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
