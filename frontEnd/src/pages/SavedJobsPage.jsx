import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

function SavedJobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    
    if (user.role !== 'CANDIDATE') {
      navigate('/jobs')
      return
    }

    const fetchSavedJobs = async () => {
      try {
        const data = await api.jobs.getSaved()
        setJobs(data)
      } catch (err) {
        setError(err.message || 'Failed to fetch saved jobs.')
      } finally {
        setLoading(false)
      }
    }

    fetchSavedJobs()
  }, [user, navigate])

  const handleUnsave = async (jobId) => {
    try {
      await api.jobs.unsave(jobId)
      // Remove from list
      setJobs((prev) => prev.filter((j) => j.id !== jobId))
    } catch {
      alert('Failed to remove from saved jobs.')
    }
  }

  return (
    <main className="single-column-layout">
      <section className="panel page-panel list-panel">
        <div className="page-heading">
          <p className="eyebrow">Bookmarks</p>
          <h2>Saved Jobs</h2>
          <p className="helper-text">
            Jobs you have saved for later.
          </p>
        </div>

        {loading ? (
          <p className="status-text loading-text">Loading your saved jobs...</p>
        ) : error ? (
          <p className="status-text error-text">{error}</p>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔖</div>
            <h3>No saved jobs</h3>
            <p>You haven't saved any jobs yet. Browse the job board and click "Save job" to bookmark them.</p>
            <button 
              className="primary-button"
              style={{ marginTop: '16px' }}
              onClick={() => navigate('/jobs')}
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="mini-list" style={{ marginTop: '20px' }}>
            {jobs.map((job) => (
              <div key={job.id} className="mini-list-item">
                <div className="mini-item-main" style={{ cursor: 'pointer' }} onClick={() => navigate(`/jobs?selected=${job.id}`)}>
                  <h4>{job.title}</h4>
                  <p>{job.company} • {job.location}</p>
                </div>
                <div className="mini-item-meta" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="badge badge-subtle">{job.workplaceType}</span>
                  <button 
                    className="secondary-button" 
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUnsave(job.id)
                    }}
                  >
                    Unsave
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default SavedJobsPage
