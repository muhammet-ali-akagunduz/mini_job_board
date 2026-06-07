import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

function JobDetailsPanel({ selectedJob, onApplySuccess, onDeleteSuccess }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [statusMsg, setStatusMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(selectedJob?.isSaved || false)
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    setIsSaved(selectedJob?.isSaved || false)
  }, [selectedJob])

  const handleApply = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (user.role !== 'CANDIDATE') {
      setErrorMsg('Only candidates can apply to job openings!')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setStatusMsg('')

    try {
      await api.applications.apply(selectedJob.id)
      setStatusMsg('✓ Applied successfully!')
      if (onApplySuccess) {
        onApplySuccess(selectedJob.id)
      }
    } catch (err) {
      setErrorMsg(err.message || 'Application failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveToggle = async () => {
    if (!user) {
      navigate('/login')
      return
    }
    
    if (user.role !== 'CANDIDATE') {
      setErrorMsg('Only candidates can save jobs!')
      return
    }

    setSaveLoading(true)
    setErrorMsg('')
    setStatusMsg('')

    try {
      if (isSaved) {
        await api.jobs.unsave(selectedJob.id)
        setIsSaved(false)
        setStatusMsg('Removed from saved jobs.')
      } else {
        await api.jobs.save(selectedJob.id)
        setIsSaved(true)
        setStatusMsg('✓ Job saved successfully!')
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update saved status')
    } finally {
      setSaveLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;
    
    setLoading(true)
    setErrorMsg('')
    
    try {
      await api.jobs.delete(selectedJob.id)
      if (onDeleteSuccess) {
        onDeleteSuccess(selectedJob.id)
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete job')
      setLoading(false)
    }
  }

  return (
    <section className="panel details-panel">
      <div className="detail-toolbar">
        <button type="button" className="icon-button" aria-label="Share">
          ↗
        </button>
        <button type="button" className="icon-button" aria-label="More options">
          ...
        </button>
      </div>

      <div className="panel-header detail-header">
        <div>
          <p className="eyebrow">{selectedJob.company}</p>
          <h2>{selectedJob.title}</h2>
          <p className="helper-text detail-meta">
            {selectedJob.location} • {selectedJob.postedAgo} • {selectedJob.applicants}{' '}
            applicants
          </p>
        </div>
      </div>

      <div className="company-block">
        <div className="logo-box large">{selectedJob.company.slice(0, 1)}</div>
        <div>
          <h3>{selectedJob.company}</h3>
          <p>{selectedJob.location}</p>
          <p className="accent-line">{selectedJob.insight}</p>
        </div>
      </div>

      <div className="tag-row detail-pills">
        <span className="detail-pill">{selectedJob.workplaceType}</span>
        <span className="detail-pill">{selectedJob.employmentType}</span>
      </div>

      {statusMsg && (
        <div style={{ color: '#51c28e', fontWeight: '600', margin: '12px 0' }}>
          {statusMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ color: '#ff6b6b', fontWeight: '600', margin: '12px 0' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <div className="cta-row">
        {!selectedJob.isOwner ? (
          <>
            <button 
              className="primary-button" 
              type="button" 
              onClick={handleApply}
              disabled={loading}
            >
              {loading ? 'Applying...' : 'Easy Apply'}
            </button>
            <button 
              className="secondary-button" 
              type="button"
              onClick={handleSaveToggle}
              disabled={saveLoading}
              style={{
                background: isSaved ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                borderColor: isSaved ? '#fff' : 'rgba(120, 143, 171, 0.32)',
                color: isSaved ? '#fff' : '#e7effb'
              }}
            >
              {saveLoading ? '...' : isSaved ? 'Saved' : 'Save job'}
            </button>
          </>
        ) : (
          <button 
            className="secondary-button" 
            type="button"
            onClick={handleDelete}
            disabled={loading}
            style={{
              borderColor: '#ff6b6b',
              color: '#ff6b6b'
            }}
          >
            {loading ? 'Deleting...' : 'Delete Job'}
          </button>
        )}
      </div>

      <article className="info-card spotlight-card">
        <h3>See how you compare to other applicants</h3>
        <p>
          Review this listing, prepare your profile, and apply while the employer is
          actively reviewing candidates.
        </p>
      </article>

      <article className="info-card connection-card">
        <div>
          <h3>People you may know here</h3>
          <p>School alumni and classmates connected to this company</p>
        </div>
        <button type="button" className="secondary-button compact-button">
          Show all
        </button>
      </article>

      <article className="info-card">
        <p className="eyebrow">About the job</p>
        <p>{selectedJob.description}</p>
      </article>

      <article className="info-card">
        <p className="eyebrow">Overview</p>
        <ul className="plain-list">
          <li>Salary: {selectedJob.salary || 'Not specified'}</li>
          <li>Type: {selectedJob.employmentType}</li>
          <li>Workplace: {selectedJob.workplaceType}</li>
          <li>Applicants: {selectedJob.applicants}</li>
        </ul>
      </article>

      <article className="info-card">
        <p className="eyebrow">Responsibilities</p>
        <ul className="plain-list">
          {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 ? (
            selectedJob.responsibilities.map((item) => <li key={item}>{item}</li>)
          ) : (
            <li>Collaborate with standard engineering teams and build clean solutions.</li>
          )}
        </ul>
      </article>
    </section>
  )
}

export default JobDetailsPanel
