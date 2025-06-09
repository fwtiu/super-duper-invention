import { useRef, useState } from 'react'

function App() {
  const [items, setItems] = useState([])
  const [text, setText] = useState('')
  const dragId = useRef(null)

  const addItem = (e) => {
    if (e) e.preventDefault()
    const trimmed = text.trim()
    if (trimmed) {
      setItems((prev) => [...prev, { id: Date.now(), text: trimmed }])
      setText('')
    }
  }

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleDrop = (overId) => {
    const dragged = dragId.current
    if (dragged === null || dragged === overId) return
    setItems((prev) => {
      const dragIndex = prev.findIndex((i) => i.id === dragged)
      const overIndex = prev.findIndex((i) => i.id === overId)
      if (dragIndex === -1 || overIndex === -1) return prev
      const updated = [...prev]
      const [removed] = updated.splice(dragIndex, 1)
      updated.splice(overIndex, 0, removed)
      return updated
    })
  }

  const handleDropToEnd = () => {
    const dragged = dragId.current
    if (dragged === null) return
    setItems((prev) => {
      const dragIndex = prev.findIndex((i) => i.id === dragged)
      if (dragIndex === -1 || dragIndex === prev.length - 1) return prev
      const updated = [...prev]
      const [removed] = updated.splice(dragIndex, 1)
      updated.push(removed)
      return updated
    })
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow">
      <h1 className="mb-6 text-3xl font-bold text-center">Todo App</h1>
      <form onSubmit={addItem} className="flex mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 px-3 py-2 mr-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>
      <ul onDragOver={(e) => e.preventDefault()} onDrop={handleDropToEnd}>
        {items.map((item) => (
          <li
            key={item.id}
            draggable
            onDragStart={() => {
              dragId.current = item.id
            }}
            onDragEnd={() => {
              dragId.current = null
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(item.id)}
            className="flex items-center justify-between p-2 mb-2 bg-gray-50 border rounded"
          >
            <span>{item.text}</span>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-sm text-red-500 transition hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
