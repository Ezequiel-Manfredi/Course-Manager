import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginProvider } from './contexts/LoginContext'
import { MovileContextProvider } from './contexts/MovileContext'
import CreatePreceptor from './pages/CreatePreceptor'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
    <LoginProvider>
    <MovileContextProvider>
      <Routes>
        <Route path='/create-preceptor' element={<CreatePreceptor/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </MovileContextProvider>
    </LoginProvider>
    </BrowserRouter>
  )
}

export default App
