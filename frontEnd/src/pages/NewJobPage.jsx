function NewJobPage() {
  return (
    <main className="single-column-layout">
      <section className="panel page-panel">
        <div className="page-heading">
          <p className="eyebrow">Employer tools</p>
          <h2>Create a new job post</h2>
          <p className="helper-text">
            Employer-only form for creating listings that match the backend job
            model.
          </p>
        </div>

        <form className="stack-form page-form two-column-form">
          <input type="text" placeholder="Job title" />
          <input type="text" placeholder="Company" />
          <input type="text" placeholder="Location" />
          <input type="text" placeholder="Salary range" />
          <select className="form-select" defaultValue="Hybrid">
            <option>Hybrid</option>
            <option>Remote</option>
            <option>On-site</option>
          </select>
          <select className="form-select" defaultValue="Full-time">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
          </select>
          <textarea className="form-textarea" placeholder="Job description" rows="6" />
          <button type="button" className="primary-button form-submit">
            Publish job
          </button>
        </form>
      </section>
    </main>
  )
}

export default NewJobPage
