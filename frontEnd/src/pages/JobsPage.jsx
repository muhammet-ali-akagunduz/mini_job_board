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

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      setError('')
      try {
        const liveJobs = await api.jobs.getAll(searchVal, locationVal, activeFilter)
        setJobs(liveJobs)
        if (liveJobs.length > 0) {
          setSelectedJob((prev) => {
            if (prev && liveJobs.some((j) => j.id === prev.id)) {
              return liveJobs.find((j) => j.id === prev.id)
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
    const found = jobs.find((j) => j.id === id)
    if (found) setSelectedJob(found)
  }

  const handleApplySuccess = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((j) =>
        j.id === jobId ? { ...j, applicants: j.applicants + 1 } : j
      )
    )
    setSelectedJob((prev) =>
      prev && prev.id === jobId ? { ...prev, applicants: prev.applicants + 1 } : prev
    )
  }

  const handleDeleteSuccess = (jobId) => {
    const remaining = jobs.filter((j) => j.id !== jobId)
    setJobs(remaining)
    setSelectedJob(remaining.length > 0 ? remaining[0] : null)
  }

  return (
    <main className="content-grid jobs-page-grid">
      {loading && jobs.length === 0 ? (
        <div style={{ padding: '24px', color: '#9baec6' }}>Loading jobs feed...</div>
      ) : error ? (
        <div style={{ padding: '24px', color: '#ff6b6b' }}>⚠️ {error}</div>
      ) : (
        <>
          <JobsPanel
            activeFilter={activeFilter}
            filters={filters}
            onFilterChange={setActiveFilter}
            onSelectJob={handleSelectJob}
            selectedJob={selectedJob || {}}
            visibleJobs={jobs}
          />
          {selectedJob ? (
            <JobDetailsPanel 
              selectedJob={selectedJob} 
              onApplySuccess={handleApplySuccess} 
              onDeleteSuccess={handleDeleteSuccess}
            />
          ) : (
            <div style={{ padding: '40px', color: '#9baec6', textAlign: 'center' }}>
              No jobs found matching your criteria.
            </div>
          )}
        </>
      )}
    </main>
  )
}

export default JobsPage
