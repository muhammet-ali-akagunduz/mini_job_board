import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function EmployerJobsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const fetchApplications = async () => {
    setLoading(true)
    setError('')
    try {
      const liveApps = await api.applications.getEmployer()
      setApplications(liveApps)
    } catch (err) {
      setError(err.message || 'Failed to load applications')
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
    
    fetchApplications()
  }, [user, navigate])

  const handleUpdateStatus = async (appId, newStatus) => {
    setActionLoading(true)
    try {
      await api.applications.updateStatus(appId, newStatus)
      // Update local state smoothly
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, status: newStatus } : app
        )
      )
    } catch (err) {
      alert(err.message || 'Failed to update status')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <main className="single-column-layout">
      <section className="panel page-panel">
        <div className="page-heading">
          <p className="eyebrow">Employer dashboard</p>
          <h2>Manage Job Applications</h2>
          <p className="helper-text">
            Review applicant profiles, email details, and update application statuses dynamically.
          </p>
        </div>

        {loading ? (
          <div style={{ color: '#9baec6' }}>Loading applications board...</div>
        ) : error ? (
          <div style={{ color: '#ff6b6b' }}>⚠️ {error}</div>
        ) : applications.length === 0 ? (
          <div style={{ color: '#9baec6', padding: '18px 0' }}>
            No applications have been submitted to your job posts yet. They will appear here when candidates apply!
          </div>
        ) : (
          <div className="mini-list">
            {applications.map((app) => (
              <article key={app.id} className="mini-row" style={{ alignItems: 'flex-start' }}>
                <div>
                  <strong style={{ fontSize: '1.05rem', color: '#76b4ff' }}>{app.jobTitle}</strong>
                  <p style={{ margin: '4px 0 2px', fontWeight: '600', color: '#e8f0fa' }}>
                    Candidate: {app.candidateName} ({app.candidateEmail})
                  </p>
                  <p style={{ margin: '0', fontSize: '0.86rem', marginBottom: '8px' }}>Applied on: {app.appliedAt}</p>
                  <Link to={`/profile/${app.candidateId}`} className="secondary-button compact-button" style={{ fontSize: '0.8rem', padding: '4px 10px', display: 'inline-block' }}>
                    View Profile
                  </Link>
                </div>
                
                <div className="mini-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span 
                    className="status-pill"
                    style={{
                      borderColor: app.status === 'Accepted' || app.status === 'ACCEPTED' ? 'rgba(81, 194, 142, 0.2)' : app.status === 'Rejected' || app.status === 'REJECTED' ? 'rgba(255, 107, 107, 0.2)' : 'rgba(120, 143, 171, 0.2)',
                      background: app.status === 'Accepted' || app.status === 'ACCEPTED' ? 'rgba(81, 194, 142, 0.08)' : app.status === 'Rejected' || app.status === 'REJECTED' ? 'rgba(255, 107, 107, 0.08)' : 'rgba(120, 143, 171, 0.08)',
                      color: app.status === 'Accepted' || app.status === 'ACCEPTED' ? '#87e8b8' : app.status === 'Rejected' || app.status === 'REJECTED' ? '#ff8a8a' : '#dce8f7'
                    }}
                  >
                    {app.status}
                  </span>
                  
                  {app.status === 'Pending' || app.status === 'PENDING' ? (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        className="primary-button compact-button"
                        style={{ padding: '4px 10px', fontSize: '0.8rem', background: '#3ebd7d', color: '#fff' }}
                        onClick={() => handleUpdateStatus(app.id, 'ACCEPTED')}
                        disabled={actionLoading}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="secondary-button compact-button"
                        style={{ padding: '4px 10px', fontSize: '0.8rem', borderColor: '#ff6b6b', color: '#ff6b6b' }}
                        onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                        disabled={actionLoading}
                      >
                        Reject
                      </button>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default EmployerJobsPage
