/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchVal, setSearchVal] = useState(searchParams.get('search') || '')
  const [locationVal, setLocationVal] = useState(searchParams.get('location') || '')

  useEffect(() => {
    setSearchVal(searchParams.get('search') || '')
    setLocationVal(searchParams.get('location') || '')
  }, [searchParams])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const query = new URLSearchParams()
    if (searchVal) query.append('search', searchVal)
    if (locationVal) query.append('location', locationVal)
    navigate(`/jobs?${query.toString()}`)
  }

  // Define dynamic links
  const links = [{ to: '/jobs', label: 'Jobs', icon: '💼' }]

  if (user) {
    if (user.role === 'CANDIDATE') {
      links.push({ to: '/saved-jobs', label: 'Saved Jobs', icon: '🔖' })
      links.push({ to: '/applications/my', label: 'Applications', icon: '📥' })
    } else if (user.role === 'EMPLOYER') {
      links.push({ to: '/employer/my-posts', label: 'My Posts', icon: '📝' })
      links.push({ to: '/employer/jobs', label: 'Applications', icon: '📥' })
      links.push({ to: '/jobs/new', label: 'Post', icon: '➕' })
    }
    links.push({ to: '/profile', label: 'Profile', icon: '👤' })
  } else {
    links.push({ to: '/login', label: 'Login', icon: '🔑' })
    links.push({ to: '/register', label: 'Register', icon: '✨' })
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/jobs" className="brand-mark brand-link brand-mark-linkedin">
          mj
        </NavLink>

        <form onSubmit={handleSearchSubmit} className="global-search">
          <label className="header-search header-search-keyword">
            <span className="search-icon">⌕</span>
            <input 
              type="text" 
              placeholder="Title, skill or company" 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </label>
          <label className="header-search header-search-location">
            <span className="search-icon">⌖</span>
            <input 
              type="text" 
              value={locationVal}
              onChange={(e) => setLocationVal(e.target.value)}
            />
          </label>
          <button type="submit" className="header-search-button">
            Search
          </button>
        </form>

        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              <span className="nav-icon" aria-hidden="true">
                {link.icon}
              </span>
              <span>{link.label}</span>
            </NavLink>
          ))}
          {user && (
            <button 
              type="button" 
              className="nav-link" 
              onClick={() => { logout(); navigate('/jobs'); }}
              style={{ cursor: 'pointer' }}
            >
              <span className="nav-icon" aria-hidden="true">
                🚪
              </span>
              <span>Logout ({user?.fullName ? user.fullName.split(' ' )[0] : 'User'})</span>
            </button>
          )}
        </nav>
      </header>

      <Outlet />
    </div>
  )
}

export default AppLayout
