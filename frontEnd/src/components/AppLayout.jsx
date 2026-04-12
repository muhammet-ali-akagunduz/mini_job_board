import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/jobs', label: 'Jobs', icon: '⌂' },
  { to: '/applications/my', label: 'Applications', icon: '▣' },
  { to: '/employer/jobs', label: 'Employer', icon: '▤' },
  { to: '/jobs/new', label: 'Post', icon: '+' },
  { to: '/login', label: 'Login', icon: '•' },
  { to: '/register', label: 'Register', icon: '◦' },
]

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/jobs" className="brand-mark brand-link brand-mark-linkedin">
          mj
        </NavLink>

        <div className="global-search">
          <label className="header-search header-search-keyword">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Title, skill or company" />
          </label>
          <label className="header-search header-search-location">
            <span className="search-icon">⌖</span>
            <input type="text" defaultValue="Warsaw, Mazowieckie" />
          </label>
          <button type="button" className="header-search-button">
            Search
          </button>
        </div>

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
        </nav>
      </header>

      <Outlet />
    </div>
  )
}

export default AppLayout
