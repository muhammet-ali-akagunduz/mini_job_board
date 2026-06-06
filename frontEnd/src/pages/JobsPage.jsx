import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import JobDetailsPanel from '../components/JobDetailsPanel'
import JobsPanel from '../components/JobsPanel'
import { filters } from '../data/mockData'
import { api } from '../services/api'

function JobsPage() {
  const [searchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [activeFilter, setActiveFilter] = useState(filters[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const searchVal = searchParams.get('search') || ''
  const locationVal = searchParams.get('location') || ''
  const querySummary = [searchVal, locationVal].filter(Boolean).join(' | ')
  const activeSummary = querySummary || 'Browsing all available roles'

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      setError('')

      try {
        const liveJobs = await api.jobs.getAll(searchVal, locationVal, activeFilter)
        setJobs(liveJobs)

        if (liveJobs.length > 0) {
          setSelectedJob((prev) => {
            if (prev && liveJobs.some((job) => job.id === prev.id)) {
              return liveJobs.find((job) => job.id === prev.id)
            }

            return liveJobs[0]
          })
        } else {
          setSelectedJob(null)
        }
      } catch (err) {
        setError(err.message || 'Failed to load jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [searchVal, locationVal, activeFilter])

  const handleSelectJob = (id) => {
    const found = jobs.find((job) => job.id === id)
    if (found) setSelectedJob(found)
  }

  const handleApplySuccess = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, applicants: job.applicants + 1 } : job
      )
    )
    setSelectedJob((prev) =>
      prev && prev.id === jobId ? { ...prev, applicants: prev.applicants + 1 } : prev
    )
  }

  const handleDeleteSuccess = (jobId) => {
    const remaining = jobs.filter((job) => job.id !== jobId)
    setJobs(remaining)
    setSelectedJob(remaining.length > 0 ? remaining[0] : null)
  }

  const statusContent =
    loading && jobs.length === 0 ? (
      <div className="page-status-message">Loading jobs feed...</div>
    ) : error ? (
      <div className="page-status-message error">{error}</div>
    ) : null

  return (
    <main className="jobs-page-shell">
      <section className="jobs-hero panel">
        <div className="jobs-hero-copy">
          <p className="eyebrow">Jobs feed</p>
          <h2>Discover roles that fit your next step</h2>
          <p className="helper-text">
            Use the search bar above to narrow the feed, then open a listing to review
            details, applicants, and job context.
          </p>
          <p className="jobs-query-summary">{activeSummary}</p>
        </div>

        <div className="jobs-hero-stats" aria-label="Job feed summary">
          <div className="stat-card">
            <span className="stat-label">Results</span>
            <strong>{jobs.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Filter</span>
            <strong>{activeFilter}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Scope</span>
            <strong>{locationVal ? 'Location based' : 'Remote friendly'}</strong>
          </div>
        </div>
      </section>

      {statusContent ? (
        statusContent
      ) : (
        <section className="content-grid jobs-page-grid">
          <JobsPanel
            activeFilter={activeFilter}
            filters={filters}
            onFilterChange={setActiveFilter}
            onSelectJob={handleSelectJob}
            selectedJob={selectedJob}
            visibleJobs={jobs}
          />
          {selectedJob ? (
            <JobDetailsPanel
              selectedJob={selectedJob}
              onApplySuccess={handleApplySuccess}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ) : (
            <div className="empty-state-panel panel">
              <h3>No jobs found</h3>
              <p>
                Try removing one of the search terms or switch the filter to see more
                listings in the feed.
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  )
}

export default JobsPage
