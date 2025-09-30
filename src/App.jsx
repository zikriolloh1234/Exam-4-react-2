import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dom from './components/dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dom />
    </>
  )
}

export default App
