function RegisterPage() {
  return (
    <main className="single-column-layout">
      <section className="panel page-panel auth-page-panel">
        <div className="page-heading">
          <p className="eyebrow">Join the network</p>
          <h2>Create a new account</h2>
          <p className="helper-text">
            Sign up as a candidate or employer and start using the platform.
          </p>
        </div>

        <form className="stack-form page-form">
          <input type="text" placeholder="Full name" />
          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />
          <select className="form-select" defaultValue="CANDIDATE">
            <option value="CANDIDATE">Candidate</option>
            <option value="EMPLOYER">Employer</option>
          </select>
          <button type="button" className="primary-button full-width">
            Register
          </button>
        </form>
      </section>
    </main>
  )
}

export default RegisterPage
