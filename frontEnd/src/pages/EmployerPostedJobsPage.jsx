import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function EmployerPostedJobsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(null)

  const fetchJobs = async () => {
    setLoading(true)
    setError('')
    try {
      const liveJobs = await api.jobs.getMyPosts()
      setJobs(liveJobs)
    } catch (err) {
      setError(err.message || 'Failed to load your posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (user.role !== 'EMPLOYER') {
      navigate('/jobs')
      return
    }
    
    fetchJobs()
  }, [user, navigate])

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job posting? This action cannot be undone.")) return;
    
    setActionLoading(jobId)
    try {
      await api.jobs.delete(jobId)
      setJobs((prev) => prev.filter((j) => j.id !== jobId))
    } catch (err) {
      alert(err.message || 'Failed to delete job')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <main className="single-column-layout">
      <section className="panel page-panel">
        <div className="page-heading">
          <p className="eyebrow">Employer dashboard</p>
          <h2>My Posts</h2>
          <p className="helper-text">
            View all the active job postings you have created and delete them if they are no longer open.
          </p>
        </div>

        {loading ? (
          <div style={{ color: '#9baec6' }}>Loading your posts...</div>
        ) : error ? (
          <div style={{ color: '#ff6b6b' }}>⚠️ {error}</div>
        ) : jobs.length === 0 ? (
          <div style={{ color: '#9baec6', padding: '18px 0' }}>
            You haven't posted any jobs yet. Click "Post" to create your first job listing!
          </div>
        ) : (
          <div className="mini-list">
            {jobs.map((job) => (
              <article key={job.id} className="mini-row" style={{ alignItems: 'flex-start' }}>
                <div>
                  <strong style={{ fontSize: '1.05rem', color: '#76b4ff' }}>{job.title}</strong>
                  <p style={{ margin: '4px 0 2px', fontWeight: '600', color: '#e8f0fa' }}>
                    {job.location} • {job.workplaceType} • {job.employmentType}
                  </p>
                  <p style={{ margin: '0', fontSize: '0.86rem', color: '#9baec6' }}>
                    Posted: {job.postedAgo} • Applicants: {job.applicants}
                  </p>
                </div>
                
                <div className="mini-meta" style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="secondary-button compact-button"
                    style={{ padding: '6px 12px', fontSize: '0.85rem', borderColor: '#ff6b6b', color: '#ff6b6b' }}
                    onClick={() => handleDelete(job.id)}
                    disabled={actionLoading === job.id}
                  >
                    {actionLoading === job.id ? 'Deleting...' : 'Delete Job'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default EmployerPostedJobsPage
