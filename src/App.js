import { useState, useEffect } from 'react'

export default function App() {
  const [books, setBooks] = useState([])
  const [newBook, setNewBook] = useState({ title: '', author: '' })

  useEffect(() => {
    // This will work both locally and on Netlify
    fetch('/db.json')
      .then(res => res.json())
      .then(data => setBooks(data.books))
  }, [])

  const handleAddBook = (e) => {
    e.preventDefault()
    // This will only work temporarily in memory
    const book = {
      id: books.length + 1,
      ...newBook
    }
    setBooks([...books, book])
    setNewBook({ title: '', author: '' })
    // Note: This change won't persist after refresh!
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      
      <form onSubmit={handleAddBook} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={e => setNewBook({...newBook, title: e.target.value})}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={e => setNewBook({...newBook, author: e.target.value})}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </form>

      <ul className="space-y-2">
        {books.map(book => (
          <li key={book.id} className="border p-2">
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  )
}


