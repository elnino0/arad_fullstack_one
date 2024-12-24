import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Signup from './pages/SignUpPage'
import AdminPage from './pages/AdminPage'
import MoviePage from './pages/MoviePage'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <>
          <BrowserRouter>
        <Routes>
        <Route
            path="/"
            element={<LoginPage />}
          />
          <Route path="/login" element={<LoginPage  />} />
          <Route path="/signin" element={<Signup />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App