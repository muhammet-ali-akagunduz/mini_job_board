function JobsPanel({
  activeFilter,
  filters,
  onFilterChange,
  onSelectJob,
  selectedJob,
  visibleJobs,
}) {
  return (
    <section className="panel jobs-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Top job picks</p>
          <h2>Recommended for you</h2>
          <p className="helper-text panel-subtext">
            Based on your search, preferences, and activity in the app
          </p>
        </div>
        <p className="helper-text">{visibleJobs.length} results</p>
      </div>

      <div className="chip-row">
        {filters.map((filter) => (
          <button
            key={filter}
            className={filter === activeFilter ? 'chip active' : 'chip'}
            onClick={() => onFilterChange(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="job-list">
        {visibleJobs.map((job) => (
          <button
            key={job.id}
            type="button"
            className={job.id === selectedJob.id ? 'job-card selected' : 'job-card'}
            onClick={() => onSelectJob(job.id)}
          >
            <div className="job-card-top">
              <div className="logo-box square">{job.company.slice(0, 1)}</div>
              <div className="job-card-main">
                <div className="job-card-heading-row">
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                  <div className="job-card-actions" aria-hidden="true">
                    <span>...</span>
                    <span>x</span>
                  </div>
                </div>
                <p className="job-meta">
                  {job.location} ({job.workplaceType})
                </p>
                <p className="job-card-insight">{job.insight}</p>
                <div className="job-card-footer">
                  <span>
                    {job.promoted ? 'Promoted' : 'Viewed'} • {job.postedAgo}
                  </span>
                  {job.easyApply ? <span>Easy Apply</span> : <span>{job.applicants} applicants</span>}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default JobsPanel
