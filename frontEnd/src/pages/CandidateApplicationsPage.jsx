import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function CandidateApplicationsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (user.role !== 'CANDIDATE') {
      navigate('/jobs')
      return
    }

    const fetchApplications = async () => {
      setLoading(true)
      try {
        const liveApps = await api.applications.getMy()
        setApplications(liveApps)
      } catch (err) {
        setError(err.message || 'Failed to load applications')
      } finally {
        setLoading(false)
      }
    }
    
    fetchApplications()
  }, [user, navigate])

  return (
    <main className="single-column-layout">
      <section className="panel page-panel">
        <div className="page-heading">
          <p className="eyebrow">Candidate dashboard</p>
          <h2>My applications</h2>
          <p className="helper-text">
            Track the status of all your submitted job applications.
          </p>
        </div>

        {loading ? (
          <div style={{ color: '#9baec6' }}>Loading applications list...</div>
        ) : error ? (
          <div style={{ color: '#ff6b6b' }}>⚠️ {error}</div>
        ) : applications.length === 0 ? (
          <div style={{ color: '#9baec6', padding: '18px 0' }}>
            You haven't submitted any job applications yet. Browse jobs and apply!
          </div>
        ) : (
          <div className="mini-list">
            {applications.map((application) => (
              <article key={application.id} className="mini-row">
                <div>
                  <strong>{application.jobTitle}</strong>
                  <p>{application.company}</p>
                </div>
                <div className="mini-meta">
                  <span 
                    className="status-pill"
                    style={{
                      borderColor: application.status === 'Accepted' ? 'rgba(81, 194, 142, 0.2)' : application.status === 'Rejected' ? 'rgba(255, 107, 107, 0.2)' : 'rgba(120, 143, 171, 0.2)',
                      background: application.status === 'Accepted' ? 'rgba(81, 194, 142, 0.08)' : application.status === 'Rejected' ? 'rgba(255, 107, 107, 0.08)' : 'rgba(120, 143, 171, 0.08)',
                      color: application.status === 'Accepted' ? '#87e8b8' : application.status === 'Rejected' ? '#ff8a8a' : '#dce8f7'
                    }}
                  >
                    {application.status}
                  </span>
                  <span>Applied on: {application.appliedAt}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default CandidateApplicationsPage
