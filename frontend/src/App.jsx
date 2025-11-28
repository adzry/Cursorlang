import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newItem, setNewItem] = useState({ name: '', description: '' })
  const [editingItem, setEditingItem] = useState(null)

  // Fetch all items
  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/items`)
      if (!response.ok) throw new Error('Failed to fetch items')
      const data = await response.json()
      setItems(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // Create item
  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newItem.name.trim()) return

    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })
      if (!response.ok) throw new Error('Failed to create item')
      const created = await response.json()
      setItems([created, ...items])
      setNewItem({ name: '', description: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  // Update item
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editingItem || !editingItem.name.trim()) return

    try {
      const response = await fetch(`${API_URL}/items/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingItem.name, description: editingItem.description })
      })
      if (!response.ok) throw new Error('Failed to update item')
      const updated = await response.json()
      setItems(items.map(item => item.id === updated.id ? updated : item))
      setEditingItem(null)
    } catch (err) {
      setError(err.message)
    }
  }

  // Delete item
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete item')
      setItems(items.filter(item => item.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🏛️ Langkasuka</h1>
        <p>Full Stack Item Manager</p>
      </header>

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <section className="form-section">
        <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
        <form onSubmit={editingItem ? handleUpdate : handleCreate}>
          <input
            type="text"
            placeholder="Item name"
            value={editingItem ? editingItem.name : newItem.name}
            onChange={(e) => editingItem 
              ? setEditingItem({ ...editingItem, name: e.target.value })
              : setNewItem({ ...newItem, name: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={editingItem ? editingItem.description : newItem.description}
            onChange={(e) => editingItem
              ? setEditingItem({ ...editingItem, description: e.target.value })
              : setNewItem({ ...newItem, description: e.target.value })
            }
          />
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              {editingItem ? 'Update' : 'Add Item'}
            </button>
            {editingItem && (
              <button type="button" className="btn-secondary" onClick={() => setEditingItem(null)}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="items-section">
        <h2>Items ({items.length})</h2>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : items.length === 0 ? (
          <p className="empty">No items yet. Add one above!</p>
        ) : (
          <ul className="items-list">
            {items.map(item => (
              <li key={item.id} className="item-card">
                <div className="item-content">
                  <h3>{item.name}</h3>
                  {item.description && <p>{item.description}</p>}
                  <small>Created: {new Date(item.created_at).toLocaleString()}</small>
                </div>
                <div className="item-actions">
                  <button className="btn-edit" onClick={() => setEditingItem(item)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App
