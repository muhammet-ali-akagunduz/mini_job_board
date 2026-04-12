function LoginPage() {
  return (
    <main className="single-column-layout">
      <section className="panel page-panel auth-page-panel">
        <div className="page-heading">
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in to continue</h2>
          <p className="helper-text">
            Access your job feed, applications, and employer tools.
          </p>
        </div>

        <form className="stack-form page-form">
          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />
          <button type="button" className="primary-button full-width">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
