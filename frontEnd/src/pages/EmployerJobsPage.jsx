import { employerJobs } from '../data/mockData'

function EmployerJobsPage() {
  return (
    <main className="single-column-layout">
      <section className="panel page-panel">
        <div className="page-heading">
          <p className="eyebrow">Employer dashboard</p>
          <h2>Manage posted jobs</h2>
          <p className="helper-text">
            This page maps to create, edit, delete, and applicant review flows.
          </p>
        </div>

        <div className="mini-list">
          {employerJobs.map((job) => (
            <article key={job.id} className="mini-row">
              <div>
                <strong>{job.title}</strong>
                <p>{job.applicants} applicants</p>
              </div>
              <div className="mini-meta">
                <span>{job.status}</span>
                <span>View / Edit / Delete</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default EmployerJobsPage
