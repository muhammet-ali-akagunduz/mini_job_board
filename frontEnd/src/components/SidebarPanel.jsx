function SidebarPanel({
  activeWorkspace,
  candidateApplications,
  employerJobs,
  onWorkspaceChange,
}) {
  return (
    <section className="panel sidebar-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Your workspace</p>
          <h2>Quick access</h2>
        </div>
      </div>

      <div className="workspace-toggle">
        <button
          type="button"
          className={activeWorkspace === 'candidate' ? 'chip active' : 'chip'}
          onClick={() => onWorkspaceChange('candidate')}
        >
          Candidate
        </button>
        <button
          type="button"
          className={activeWorkspace === 'employer' ? 'chip active' : 'chip'}
          onClick={() => onWorkspaceChange('employer')}
        >
          Employer
        </button>
      </div>

      <article className="auth-card">
        <p className="eyebrow">Account</p>
        <h3>Sign in or create an account</h3>
        <form className="stack-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          {activeWorkspace === 'employer' ? (
            <input type="text" placeholder="Company or full name" />
          ) : (
            <input type="text" placeholder="Full name" />
          )}
          <button type="button" className="primary-button full-width">
            {activeWorkspace === 'candidate'
              ? 'Preview candidate auth'
              : 'Preview employer auth'}
          </button>
        </form>
      </article>

      {activeWorkspace === 'candidate' ? (
        <article className="info-card">
          <p className="eyebrow">Candidate</p>
          <h3>Recent applications</h3>
          <div className="mini-list">
            {candidateApplications.map((application) => (
              <div key={application.id} className="mini-row">
                <div>
                  <strong>{application.jobTitle}</strong>
                  <p>{application.company}</p>
                </div>
                <div className="mini-meta">
                  <span>{application.status}</span>
                  <span>{application.appliedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      ) : (
        <article className="info-card">
          <p className="eyebrow">Employer</p>
          <h3>Your active job posts</h3>
          <div className="mini-list">
            {employerJobs.map((job) => (
              <div key={job.id} className="mini-row">
                <div>
                  <strong>{job.title}</strong>
                  <p>{job.applicants} applicants</p>
                </div>
                <div className="mini-meta">
                  <span>{job.status}</span>
                  <span>Edit / Delete</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      )}

      <article className="info-card">
        <p className="eyebrow">Helpful next steps</p>
        <ul className="plain-list">
          <li>Browse jobs and open a full listing</li>
          <li>Create an account as candidate or employer</li>
          <li>Track recent applications in one place</li>
          <li>Manage created jobs from the employer area</li>
          <li>Connect each page to the backend endpoints next</li>
        </ul>
      </article>
    </section>
  )
}

export default SidebarPanel
