import { useState } from 'react'
import './App.css'
import AppRoutes from './AppRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppRoutes />
    <button type="button" onClick={()=> setCount((count)=> count + 1)}>count: {count}</button>
    </>
  )
}

export default App
