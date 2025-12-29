import { useState, useEffect } from 'react'
import { fetchTaxes, fetchCountries, updateTax } from './service/api'
import Navbar from './components/Navbar/Navbar'
import DataTable from './components/Table/DataTable'
import EditModal from './components/EditModal/EditModal'
import './styles.css'

export default function App() {
  const [taxes, setTaxes] = useState([])
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('light')
  const [editItem, setEditItem] = useState(null)
  const [columnFilters, setColumnFilters] = useState([])

  // Load data on mount
  useEffect(() => {
    Promise.all([fetchTaxes(), fetchCountries()])
      .then(([taxData, countryData]) => {
        setTaxes(taxData)
        setCountries(countryData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load data:', err)
        setLoading(false)
      })
  }, [])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleEdit = (item) => {
    setEditItem(item)
  }

  const handleSave = async (data) => {
    try {
      const updated = await updateTax(data.id, data)
      setTaxes(prev => prev.map(t => t.id === data.id ? { ...t, ...updated } : t))
      setEditItem(null)
    } catch (err) {
      console.error('Failed to save:', err)
      alert('Failed to save changes')
    }
  }

  return (
    <div className="app">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      
      <main className="main-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : (
          <DataTable 
            data={taxes} 
            onEdit={handleEdit}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        )}
      </main>

      {editItem && (
        <EditModal
          item={editItem}
          countries={countries}
          onClose={() => setEditItem(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
