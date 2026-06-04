import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setError('')
    setLoading(true)

    try {
      const loggedInUser = await login(email, password)
      if (loggedInUser.role === 'EMPLOYER') {
        navigate('/employer/jobs')
      } else {
        navigate('/jobs')
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="single-column-layout">
      <section className="panel page-panel auth-page-panel">
        <div className="page-heading">
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in to continue</h2>
          <p className="helper-text">
            Access your job feed, applications, and employer tools.
          </p>
        </div>

        {error && (
          <div style={{ color: '#ff6b6b', marginBottom: '14px', fontWeight: '600' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="stack-form page-form">
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="helper-text" style={{ marginTop: '20px', textAlign: 'center' }}>
          Don't have an account? <Link to="/register" style={{ color: '#76b4ff', textDecoration: 'none' }}>Register here</Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
