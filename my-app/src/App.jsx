import { useState } from 'react'

function App() {
  const [items, setItems] = useState([])
  const [text, setText] = useState('')

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

  return (
    <div className="max-w-md p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Todo App</h1>
      <form onSubmit={addItem} className="flex mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 px-2 py-1 mr-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-1 text-white bg-blue-600 rounded"
        >
          Add
        </button>
      </form>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between mb-2"
          >
            <span>{item.text}</span>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-red-500 hover:underline"
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
