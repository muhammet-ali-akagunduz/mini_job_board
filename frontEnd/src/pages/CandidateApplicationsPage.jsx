import { candidateApplications } from '../data/mockData'

function CandidateApplicationsPage() {
  return (
    <main className="single-column-layout">
      <section className="panel page-panel">
        <div className="page-heading">
          <p className="eyebrow">Candidate dashboard</p>
          <h2>My applications</h2>
          <p className="helper-text">
            Candidate-only page for tracking submitted job applications.
          </p>
        </div>

        <div className="mini-list">
          {candidateApplications.map((application) => (
            <article key={application.id} className="mini-row">
              <div>
                <strong>{application.jobTitle}</strong>
                <p>{application.company}</p>
              </div>
              <div className="mini-meta">
                <span>{application.status}</span>
                <span>{application.appliedAt}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default CandidateApplicationsPage
