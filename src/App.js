import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/common/Navbar'
import OpenRoute from './components/core/Auth/OpenRoute'
function App() {
  return (
    <div className='flex flex-col w-screen min-h-screen bg-richblack-900 font-inter'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='signup'
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path='login'
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
