import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function PublicProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await api.users.getPublicProfile(id);
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch public profile', err);
      alert('Candidate profile not found or you do not have permission to view it.');
      navigate(-1); // go back
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '24px', color: '#9baec6' }}>Loading profile...</div>;
  if (!profile) return <div style={{ padding: '24px', color: '#ff6b6b' }}>Error loading profile.</div>;

  return (
    <div className="profile-container">
      {/* Intro Card */}
      <div className="profile-card">
        <div className="profile-banner">
          {profile.bannerUrl && <img src={profile.bannerUrl} alt="Banner" className="profile-banner-img" />}
        </div>
        <div className="profile-avatar-container">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="Avatar" className="profile-avatar" />
          ) : (
            <div className="profile-avatar">{profile.fullName.charAt(0)}</div>
          )}
        </div>
        
        <div className="profile-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 className="profile-name">{profile.fullName}</h1>
              <p className="profile-headline">{profile.headline || 'No headline provided'}</p>
              <p className="profile-location">{profile.location || 'Location not specified'}</p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="primary-button" onClick={() => window.location.href = `mailto:${profile.email}`}>
              Contact via Email
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      {profile.about && (
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>About</h2>
          </div>
          <div className="profile-card-content">
            <p style={{ whiteSpace: 'pre-line', margin: 0, color: '#e7effb', lineHeight: 1.6 }}>{profile.about}</p>
          </div>
        </div>
      )}

      {/* Experience Section */}
      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Experience</h2>
        </div>
        <div className="profile-card-content">
          {profile.experiences?.length > 0 ? (
            profile.experiences.map(exp => (
              <div key={exp.id} className="profile-list-item">
                <div className="profile-item-logo">{exp.company.charAt(0)}</div>
                <div className="profile-item-content" style={{ flex: 1 }}>
                  <h4>{exp.role}</h4>
                  <p>{exp.company}</p>
                  <p className="profile-item-meta">{exp.startDate} - {exp.endDate || 'Present'} • {exp.location}</p>
                  <p className="profile-item-desc">{exp.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No professional experience added yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Education</h2>
        </div>
        <div className="profile-card-content">
          {profile.educations?.length > 0 ? (
            profile.educations.map(edu => (
              <div key={edu.id} className="profile-list-item">
                <div className="profile-item-logo">{edu.school.charAt(0)}</div>
                <div className="profile-item-content" style={{ flex: 1 }}>
                  <h4>{edu.school}</h4>
                  <p>{edu.degree}, {edu.fieldOfStudy}</p>
                  <p className="profile-item-meta">{edu.startYear} - {edu.endYear}</p>
                  {edu.activities && <p className="profile-item-desc">Activities: {edu.activities}</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No educational background added yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Skills</h2>
        </div>
        <div className="profile-card-content">
          {profile.skills?.length > 0 ? (
            <div className="skills-container">
              {profile.skills.map(skill => (
                <div key={skill.id} className="skill-badge">
                  {skill.name}
                  {skill.endorsementCount > 0 && <span className="endorsement-count">{skill.endorsementCount}</span>}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No skills added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicProfilePage;
