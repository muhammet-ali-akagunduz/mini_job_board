import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingIntro, setEditingIntro] = useState(false);
  const [introFormData, setIntroFormData] = useState({});
  const [activeModal, setActiveModal] = useState(null); // 'experience', 'education', 'certification', 'skill'
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.users.getProfile();
      setProfile(data);
      setIntroFormData({
        fullName: data.fullName,
        headline: data.headline,
        location: data.location,
        about: data.about,
        avatarUrl: data.avatarUrl || '',
        bannerUrl: data.bannerUrl || '',
      });
    } catch (err) {
      console.error('Failed to fetch profile', err);
    } finally {
      setLoading(false);
    }
  };

  const handleIntroSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.users.updateProfile(introFormData);
      setEditingIntro(false);
      fetchProfile();
      // Update global user name if changed
      if (introFormData.fullName !== user.fullName) {
        setUser({ ...user, fullName: introFormData.fullName });
      }
    } catch {
      alert('Failed to update profile');
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeModal === 'experience') await api.profile.addExperience(formData);
      if (activeModal === 'education') await api.profile.addEducation(formData);
      if (activeModal === 'certification') await api.profile.addCertification(formData);
      if (activeModal === 'skill') await api.profile.addSkill(formData);
      
      setActiveModal(null);
      setFormData({});
      fetchProfile();
    } catch {
      alert(`Failed to add ${activeModal}`);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      if (type === 'experience') await api.profile.deleteExperience(id);
      if (type === 'education') await api.profile.deleteEducation(id);
      if (type === 'certification') await api.profile.deleteCertification(id);
      if (type === 'skill') await api.profile.deleteSkill(id);
      fetchProfile();
    } catch {
      alert('Failed to delete item');
    }
  };

  if (loading) return <div className="loading-container">Loading profile...</div>;
  if (!profile) return <div className="loading-container">Error loading profile.</div>;

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
        
        {editingIntro ? (
          <form onSubmit={handleIntroSubmit} className="profile-info">
            <div className="form-group">
              <label>Full Name</label>
              <input className="form-input" type="text" value={introFormData.fullName || ''} onChange={e => setIntroFormData({...introFormData, fullName: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Headline</label>
              <input className="form-input" type="text" value={introFormData.headline || ''} onChange={e => setIntroFormData({...introFormData, headline: e.target.value})} placeholder="e.g. Software Engineer at Tech Corp" />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input className="form-input" type="text" value={introFormData.location || ''} onChange={e => setIntroFormData({...introFormData, location: e.target.value})} placeholder="e.g. San Francisco, CA" />
            </div>
            <div className="form-group">
              <label>Profile Photo URL</label>
              <input className="form-input" type="url" value={introFormData.avatarUrl || ''} onChange={e => setIntroFormData({...introFormData, avatarUrl: e.target.value})} placeholder="https://example.com/photo.jpg" />
            </div>
            <div className="form-group">
              <label>Banner Image URL</label>
              <input className="form-input" type="url" value={introFormData.bannerUrl || ''} onChange={e => setIntroFormData({...introFormData, bannerUrl: e.target.value})} placeholder="https://example.com/banner.jpg" />
            </div>
            <div className="form-group">
              <label>About</label>
              <textarea className="form-textarea" value={introFormData.about || ''} onChange={e => setIntroFormData({...introFormData, about: e.target.value})} rows="4" />
            </div>
            <div className="profile-actions">
              <button type="submit" className="primary-button">Save</button>
              <button type="button" className="secondary-button" onClick={() => setEditingIntro(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 className="profile-name">{profile.fullName}</h1>
                <p className="profile-headline">{profile.headline || 'Add a headline'}</p>
                <p className="profile-location">{profile.location || 'Add location'}</p>
              </div>
              <button className="secondary-button" onClick={() => setEditingIntro(true)}>✏️ Edit Profile</button>
            </div>
          </div>
        )}
      </div>

      {/* About Section */}
      {!editingIntro && profile.about && (
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
          <button className="secondary-button" onClick={() => setActiveModal('experience')}>+ Add</button>
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
                <button className="secondary-button" style={{ padding: '4px 8px', height: 'fit-content' }} onClick={() => handleDelete('experience', exp.id)}>🗑️</button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Showcase your professional experience.</p>
            </div>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Education</h2>
          <button className="secondary-button" onClick={() => setActiveModal('education')}>+ Add</button>
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
                <button className="secondary-button" style={{ padding: '4px 8px', height: 'fit-content' }} onClick={() => handleDelete('education', edu.id)}>🗑️</button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Add your educational background.</p>
            </div>
          )}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Certifications</h2>
          <button className="secondary-button" onClick={() => setActiveModal('certification')}>+ Add</button>
        </div>
        <div className="profile-card-content">
          {profile.certifications?.length > 0 ? (
            profile.certifications.map(cert => (
              <div key={cert.id} className="profile-list-item">
                <div className="profile-item-logo">📜</div>
                <div className="profile-item-content" style={{ flex: 1 }}>
                  <h4>{cert.name}</h4>
                  <p>{cert.issuingOrganization}</p>
                  <p className="profile-item-meta">Issued {cert.issueDate}</p>
                  {cert.credentialId && <p className="profile-item-meta" style={{ fontSize: '12px' }}>Credential ID: {cert.credentialId}</p>}
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="profile-item-desc" style={{ color: '#76b4ff', textDecoration: 'none', display: 'inline-block', marginTop: '4px' }}>
                      🔗 View credential
                    </a>
                  )}
                </div>
                <button className="secondary-button" style={{ padding: '4px 8px', height: 'fit-content' }} onClick={() => handleDelete('certification', cert.id)}>🗑️</button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Add your professional certifications and licenses.</p>
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Skills</h2>
          <button className="secondary-button" onClick={() => setActiveModal('skill')}>+ Add</button>
        </div>
        <div className="profile-card-content">
          {profile.skills?.length > 0 ? (
            <div className="skills-container">
              {profile.skills.map(skill => (
                <div key={skill.id} className="skill-badge">
                  {skill.name}
                  {skill.endorsementCount > 0 && <span className="endorsement-count">{skill.endorsementCount}</span>}
                  <button style={{ background: 'none', border: 'none', color: '#788fab', cursor: 'pointer', padding: 0, marginLeft: 4 }} onClick={() => handleDelete('skill', skill.id)}>×</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Highlight your top skills.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals for Adding Items */}
      {activeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add {activeModal.charAt(0).toUpperCase() + activeModal.slice(1)}</h3>
              <button className="modal-close" onClick={() => { setActiveModal(null); setFormData({}); }}>×</button>
            </div>
            <form onSubmit={handleItemSubmit}>
              <div className="modal-body">
                {activeModal === 'experience' && (
                  <>
                    <div className="form-group">
                      <label>Title</label>
                      <input className="form-input" type="text" required value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Company name</label>
                      <input className="form-input" type="text" required value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input className="form-input" type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Start Date (e.g. Jan 2022)</label>
                        <input className="form-input" type="text" value={formData.startDate || ''} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>End Date (leave blank if present)</label>
                        <input className="form-input" type="text" value={formData.endDate || ''} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea className="form-textarea" rows="4" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                    </div>
                  </>
                )}

                {activeModal === 'education' && (
                  <>
                    <div className="form-group">
                      <label>School</label>
                      <input className="form-input" type="text" required value={formData.school || ''} onChange={e => setFormData({...formData, school: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Degree</label>
                      <input className="form-input" type="text" value={formData.degree || ''} onChange={e => setFormData({...formData, degree: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Field of study</label>
                      <input className="form-input" type="text" value={formData.fieldOfStudy || ''} onChange={e => setFormData({...formData, fieldOfStudy: e.target.value})} />
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Start Year</label>
                        <input className="form-input" type="text" value={formData.startYear || ''} onChange={e => setFormData({...formData, startYear: e.target.value})} />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>End Year</label>
                        <input className="form-input" type="text" value={formData.endYear || ''} onChange={e => setFormData({...formData, endYear: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Activities and societies</label>
                      <textarea className="form-textarea" rows="3" value={formData.activities || ''} onChange={e => setFormData({...formData, activities: e.target.value})}></textarea>
                    </div>
                  </>
                )}

                {activeModal === 'certification' && (
                  <>
                    <div className="form-group">
                      <label>Certification Name</label>
                      <input className="form-input" type="text" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Issuing Organization</label>
                      <input className="form-input" type="text" required value={formData.issuingOrganization || ''} onChange={e => setFormData({...formData, issuingOrganization: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Issue Date (e.g. May 2023)</label>
                      <input className="form-input" type="text" value={formData.issueDate || ''} onChange={e => setFormData({...formData, issueDate: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Credential ID</label>
                      <input className="form-input" type="text" value={formData.credentialId || ''} onChange={e => setFormData({...formData, credentialId: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Credential URL</label>
                      <input className="form-input" type="url" value={formData.credentialUrl || ''} onChange={e => setFormData({...formData, credentialUrl: e.target.value})} placeholder="https://example.com/verify" />
                    </div>
                  </>
                )}

                {activeModal === 'skill' && (
                  <div className="form-group">
                    <label>Skill name</label>
                    <input className="form-input" type="text" required placeholder="e.g. React.js, Python, Project Management" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="secondary-button" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="primary-button">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
