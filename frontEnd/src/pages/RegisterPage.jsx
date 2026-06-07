import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('CANDIDATE') // CANDIDATE or EMPLOYER (matching backend Role enum)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fullName || !email || !password || !role) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await register(fullName, email, password, role)
      setSuccess('Registration successful! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="single-column-layout">
      <section className="panel page-panel auth-page-panel">
        <div className="page-heading">
          <p className="eyebrow">Join the network</p>
          <h2>Create a new account</h2>
          <p className="helper-text">
            Sign up as a candidate or employer and start using the platform.
          </p>
        </div>

        {error && (
          <div style={{ color: '#ff6b6b', marginBottom: '14px', fontWeight: '600' }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={{ color: '#51c28e', marginBottom: '14px', fontWeight: '600' }}>
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="stack-form page-form">
          <input 
            id="fullName"
            name="fullName"
            type="text" 
            placeholder="Full name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
            required
            autoComplete="name"
          />
          <input 
            id="email"
            name="email"
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            autoComplete="email"
          />
          <input 
            id="password"
            name="password"
            type="password" 
            placeholder="Password (min 6 characters)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            autoComplete="new-password"
          />
          <select 
            id="role"
            name="role"
            className="form-select" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            required
          >
            <option value="CANDIDATE">Candidate</option>
            <option value="EMPLOYER">Employer</option>
          </select>
          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="helper-text" style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#76b4ff', textDecoration: 'none' }}>Login here</Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
