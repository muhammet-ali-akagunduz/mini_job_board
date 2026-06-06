function JobDetailsPanel({ selectedJob }) {
  return (
    <section className="panel details-panel">
      <div className="detail-toolbar">
        <button type="button" className="icon-button" aria-label="Share job">
          Share
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
            {selectedJob.location} - {selectedJob.postedAgo} - {selectedJob.applicants}{' '}
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
        {selectedJob.easyApply ? <span className="detail-pill">Easy Apply</span> : null}
      </div>

      <div className="detail-metrics">
        <article className="detail-metric">
          <span className="detail-metric-label">Salary</span>
          <strong className="detail-metric-value">{selectedJob.salary}</strong>
        </article>
        <article className="detail-metric">
          <span className="detail-metric-label">Type</span>
          <strong className="detail-metric-value">{selectedJob.employmentType}</strong>
        </article>
        <article className="detail-metric">
          <span className="detail-metric-label">Workplace</span>
          <strong className="detail-metric-value">{selectedJob.workplaceType}</strong>
        </article>
        <article className="detail-metric">
          <span className="detail-metric-label">Applicants</span>
          <strong className="detail-metric-value">{selectedJob.applicants}</strong>
        </article>
      </div>

      <div className="cta-row">
        <button className="primary-button" type="button">
          Easy Apply
        </button>
        <button className="secondary-button" type="button">
          Save job
        </button>
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
        <p className="eyebrow">Responsibilities</p>
        <ul className="plain-list">
          {selectedJob.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="info-card">
        <p className="eyebrow">Skills highlighted</p>
        <div className="tag-row">
          {selectedJob.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </section>
  )
}

export default JobDetailsPanel
