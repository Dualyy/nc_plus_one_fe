import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section>
        <h1>Hello World!</h1>
        <button type="button" onClick={() => setCount((count) => count +1)}>Count: {count}</button>
      </section>
    </>
  )
}

export default App
