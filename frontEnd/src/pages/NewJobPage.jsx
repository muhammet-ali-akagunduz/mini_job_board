import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

function NewJobPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [workplaceType, setWorkplaceType] = useState('Hybrid')
  const [employmentType, setEmploymentType] = useState('Full-time')
  const [description, setDescription] = useState('')
  const [responsibilities, setResponsibilities] = useState('')
  const [tags, setTags] = useState('')
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (user.role !== 'EMPLOYER') {
      navigate('/jobs')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title || !company || !location || !description) {
      setError('Please fill in all required fields (Title, Company, Location, Description)')
      return
    }

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await api.jobs.create({
        title,
        company,
        location,
        salary,
        workplaceType,
        employmentType,
        description,
        responsibilities,
        tags,
      })
      
      setSuccess('✓ Job posting published successfully! Redirecting...')
      setTimeout(() => {
        navigate('/employer/jobs')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to publish job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="single-column-layout">
      <section className="panel page-panel">
        <div className="page-heading">
          <p className="eyebrow">Employer tools</p>
          <h2>Create a new job post</h2>
          <p className="helper-text">
            Employer-only form for creating listings that will automatically match candidate search feeds.
          </p>
        </div>

        {error && (
          <div style={{ color: '#ff6b6b', marginBottom: '14px', fontWeight: '600' }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={{ color: '#51c28e', marginBottom: '14px', fontWeight: '600' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="stack-form page-form two-column-form">
          <input 
            type="text" 
            placeholder="Job title *" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />
          <input 
            type="text" 
            placeholder="Company *" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={loading}
            required
          />
          <input 
            type="text" 
            placeholder="Location *" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={loading}
            required
          />
          <input 
            type="text" 
            placeholder="Salary range (e.g. 5,000 - 7,000 PLN)" 
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            disabled={loading}
          />
          <select 
            className="form-select" 
            value={workplaceType}
            onChange={(e) => setWorkplaceType(e.target.value)}
            disabled={loading}
            required
          >
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
          <select 
            className="form-select" 
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            disabled={loading}
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
          <input 
            type="text" 
            placeholder="Key tags (comma-separated, e.g. React, CSS, API)" 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            disabled={loading}
            style={{ gridColumn: '1 / -1' }}
          />
          <textarea 
            className="form-textarea" 
            placeholder="Responsibilities (comma-separated, e.g. Build reusable UI, Collab with API)" 
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            disabled={loading}
            rows="3"
            style={{ gridColumn: '1 / -1' }}
          />
          <textarea 
            className="form-textarea" 
            placeholder="Job description * (Describe the role details...)" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            rows="6"
            required
            style={{ gridColumn: '1 / -1' }}
          />
          <button type="submit" className="primary-button form-submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish job'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default NewJobPage
