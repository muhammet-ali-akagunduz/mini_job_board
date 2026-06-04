const BASE_URL = 'http://localhost:8080';

const request = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errData = await response.json();
      errorMsg = errData.message || errorMsg;
    } catch (e) {
      // Ignored
    }
    throw new Error(errorMsg);
  }

  // Handle empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

export const api = {
  auth: {
    login: (email, password) => 
      request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    
    register: (fullName, email, password, role) =>
      request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ fullName, email, password, role }),
      }),
  },
  
  jobs: {
    getAll: (search = '', location = '', filter = 'All jobs') => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (location) params.append('location', location);
      
      if (filter === 'Remote') params.append('workplaceType', 'REMOTE');
      else if (filter === 'Hybrid') params.append('workplaceType', 'HYBRID');
      else if (filter === 'On-site' || filter === 'Onsite') params.append('workplaceType', 'ONSITE');
      
      if (filter === 'Part-time') params.append('employmentType', 'PART_TIME');
      else if (filter === 'Full-time') params.append('employmentType', 'FULL_TIME');
      else if (filter === 'Internship') params.append('employmentType', 'INTERNSHIP');
      
      const query = params.toString();
      return request(`/api/jobs${query ? `?${query}` : ''}`);
    },
    
    getById: (id) => request(`/api/jobs/${id}`),
    
    create: (jobData) => {
      // Map frontend fields to backend WorkplaceType & EmploymentType enums
      let wt = 'HYBRID';
      if (jobData.workplaceType === 'Remote') wt = 'REMOTE';
      else if (jobData.workplaceType === 'On-site' || jobData.workplaceType === 'Onsite' || jobData.workplaceType === 'On-Site') wt = 'ONSITE';

      let et = 'FULL_TIME';
      if (jobData.employmentType === 'Part-time') et = 'PART_TIME';
      else if (jobData.employmentType === 'Internship') et = 'INTERNSHIP';

      return request('/api/jobs', {
        method: 'POST',
        body: JSON.stringify({
          title: jobData.title,
          company: jobData.company,
          location: jobData.location,
          workplaceType: wt,
          employmentType: et,
          salary: jobData.salary,
          description: jobData.description,
          responsibilities: jobData.responsibilities,
          tags: jobData.tags,
        }),
      });
    },
    
    delete: (id) =>
      request(`/api/jobs/${id}`, {
        method: 'DELETE',
      }),
      
    save: (id) =>
      request(`/api/jobs/${id}/save`, {
        method: 'POST',
      }),
      
    unsave: (id) =>
      request(`/api/jobs/${id}/save`, {
        method: 'DELETE',
      }),
      
    getSaved: () => request('/api/jobs/saved'),
    getMyPosts: () => request('/api/jobs/me'),
  },
  
  applications: {
    apply: (jobId) =>
      request(`/api/applications/apply/${jobId}`, {
        method: 'POST',
      }),
      
    getMy: () => request('/api/applications/my'),
    
    getEmployer: () => request('/api/applications/employer'),
    
    updateStatus: (appId, status) => {
      // Map to backend ApplicationStatus enum (PENDING, ACCEPTED, REJECTED)
      let s = 'PENDING';
      if (status === 'Accepted' || status === 'ACCEPTED') s = 'ACCEPTED';
      else if (status === 'Rejected' || status === 'REJECTED') s = 'REJECTED';

      return request(`/api/applications/${appId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: s }),
      });
    },
  },

  users: {
    getProfile: () => request('/api/users/profile'),
    getPublicProfile: (id) => request(`/api/users/${id}/profile`),
    updateProfile: (data) =>
      request('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  profile: {
    addExperience: (data) => request('/api/profile/experiences', { method: 'POST', body: JSON.stringify(data) }),
    deleteExperience: (id) => request(`/api/profile/experiences/${id}`, { method: 'DELETE' }),

    addEducation: (data) => request('/api/profile/educations', { method: 'POST', body: JSON.stringify(data) }),
    deleteEducation: (id) => request(`/api/profile/educations/${id}`, { method: 'DELETE' }),

    addCertification: (data) => request('/api/profile/certifications', { method: 'POST', body: JSON.stringify(data) }),
    deleteCertification: (id) => request(`/api/profile/certifications/${id}`, { method: 'DELETE' }),

    addSkill: (data) => request('/api/profile/skills', { method: 'POST', body: JSON.stringify(data) }),
    deleteSkill: (id) => request(`/api/profile/skills/${id}`, { method: 'DELETE' }),
  },
};
