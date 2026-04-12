import { useMemo, useState } from 'react'
import JobDetailsPanel from '../components/JobDetailsPanel'
import JobsPanel from '../components/JobsPanel'
import { filters, jobs } from '../data/mockData'

function JobsPage() {
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id)
  const [activeFilter, setActiveFilter] = useState(filters[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [locationTerm, setLocationTerm] = useState('Poland')

  const visibleJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesFilter =
        activeFilter === 'All jobs' ||
        job.workplaceType === activeFilter ||
        job.employmentType === activeFilter

      const searchableText = `${job.title} ${job.company} ${job.tags.join(' ')}`
        .toLowerCase()
      const matchesSearch = searchableText.includes(searchTerm.toLowerCase())
      const matchesLocation = job.location
        .toLowerCase()
        .includes(locationTerm.toLowerCase())

      return matchesFilter && matchesSearch && matchesLocation
    })
  }, [activeFilter, locationTerm, searchTerm])

  const selectedJob =
    visibleJobs.find((job) => job.id === selectedJobId) ?? visibleJobs[0] ?? jobs[0]

  return (
    <main className="content-grid jobs-page-grid">
        <JobsPanel
          activeFilter={activeFilter}
          filters={filters}
          onFilterChange={setActiveFilter}
          onSelectJob={setSelectedJobId}
          selectedJob={selectedJob}
          visibleJobs={visibleJobs}
        />
        <JobDetailsPanel selectedJob={selectedJob} />
      </main>
  )
}

export default JobsPage
