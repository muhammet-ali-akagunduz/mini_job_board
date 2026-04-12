function TopBar({ locationTerm, onLocationChange, onSearchChange, searchTerm }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark brand-mark-linkedin">in</div>
        <div>
          <p className="eyebrow">Jobs</p>
          <h1>Discover your next opportunity</h1>
        </div>
      </div>

      <div className="search-strip">
        <label className="search-box">
          <span>Role</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Title, skill or company"
          />
        </label>
        <label className="search-box">
          <span>Location</span>
          <input
            type="text"
            value={locationTerm}
            onChange={(event) => onLocationChange(event.target.value)}
            placeholder="City or remote"
          />
        </label>
        <button className="primary-button" type="button">
          Search
        </button>
      </div>
    </header>
  )
}

export default TopBar
