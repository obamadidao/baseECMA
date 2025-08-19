import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import List from './List'
import Add from './Add'
import Edit from './Edit'
import Register from './Register'
import Login from './Login'
function App() {
  return (
    <>
      <nav style={{
        display: 'flex',
        gap: '20px',
        backgroundColor: '#005f73',
        padding: '15px 30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
 

      </nav>



    </>
  )
}
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '16px',
  padding: '8px 12px',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
  cursor: 'pointer',
}
export default App
