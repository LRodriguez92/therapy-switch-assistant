import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Therapy Switch Assistant
        </h1>
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            Tailwind CSS is working! 🎉
          </p>
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Count is {count}
          </button>
        </div>
        <div className="mt-6 p-4 bg-green-100 rounded-lg">
          <p className="text-sm text-green-800">
            ✓ Tailwind CSS installed and configured
          </p>
          <p className="text-sm text-green-800 mt-1">
            ✓ Vite development server ready
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
