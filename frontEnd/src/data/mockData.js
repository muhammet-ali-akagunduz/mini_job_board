export const jobs = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'EduBridge Labs',
    location: 'Warsaw, Poland',
    workplaceType: 'Hybrid',
    employmentType: 'Internship',
    postedAgo: '2 days ago',
    applicants: 12,
    salary: '4,000 - 5,500 PLN',
    insight: 'Actively reviewing applicants',
    promoted: true,
    easyApply: true,
    description:
      'Build reusable UI components for the job board, collaborate with backend teammates, and turn wireframes into polished student-friendly experiences.',
    responsibilities: [
      'Create responsive React components for browsing jobs and applications.',
      'Work with API responses from the Java Spring Boot backend.',
      'Keep the interface clean, accessible, and easy to demo during presentation.',
    ],
    tags: ['React', 'CSS', 'API Integration'],
  },
  {
    id: 2,
    title: 'Junior Java Developer',
    company: 'Campus Talent Hub',
    location: 'Krakow, Poland',
    workplaceType: 'On-site',
    employmentType: 'Full-time',
    postedAgo: '4 days ago',
    applicants: 7,
    salary: '7,000 - 9,000 PLN',
    insight: 'Be among the first applicants',
    promoted: true,
    easyApply: false,
    description:
      'Support backend feature development for authentication, job posting APIs, and application workflows in a Spring Boot environment.',
    responsibilities: [
      'Maintain REST endpoints for jobs and applications.',
      'Implement validation, DTO mapping, and secure JWT auth flows.',
      'Coordinate with frontend teammates on API contracts and edge cases.',
    ],
    tags: ['Java', 'Spring Boot', 'MySQL'],
  },
  {
    id: 3,
    title: 'UI/UX Design Assistant',
    company: 'NorthStar Academy',
    location: 'Remote',
    workplaceType: 'Remote',
    employmentType: 'Part-time',
    postedAgo: '1 week ago',
    applicants: 19,
    salary: '3,000 - 4,500 PLN',
    insight: 'School alumni work here',
    promoted: false,
    easyApply: true,
    description:
      'Help shape a clean student job platform by organizing layouts, improving readability, and supporting visual consistency across the app.',
    responsibilities: [
      'Refine layouts for listings, dashboards, and forms.',
      'Prepare design suggestions for candidate and employer views.',
      'Support quick iterations during the school project timeline.',
    ],
    tags: ['Figma', 'Design Systems', 'Accessibility'],
  },
  {
    id: 4,
    title: 'QA Automation Trainee',
    company: 'SkillForge Systems',
    location: 'Gdansk, Poland',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    postedAgo: '3 days ago',
    applicants: 5,
    salary: '5,000 - 6,500 PLN',
    insight: 'Hiring team usually responds in 1 week',
    promoted: false,
    easyApply: false,
    description:
      'Assist in testing user registration, login, and application flows to keep the platform stable across releases.',
    responsibilities: [
      'Write test cases for auth and job application scenarios.',
      'Verify employer-only and candidate-only actions.',
      'Report UI bugs and API mismatches during integration.',
    ],
    tags: ['Testing', 'Postman', 'QA'],
  },
]

export const candidateApplications = [
  {
    id: 101,
    jobTitle: 'Frontend Developer Intern',
    company: 'EduBridge Labs',
    status: 'Pending',
    appliedAt: '2026-04-10',
  },
  {
    id: 102,
    jobTitle: 'UI/UX Design Assistant',
    company: 'NorthStar Academy',
    status: 'Accepted',
    appliedAt: '2026-04-04',
  },
]

export const employerJobs = [
  {
    id: 201,
    title: 'Junior Backend Developer',
    applicants: 8,
    status: 'Active',
  },
  {
    id: 202,
    title: 'React Support Developer',
    applicants: 3,
    status: 'Draft',
  },
]

export const filters = ['All jobs', 'Remote', 'Hybrid', 'Part-time', 'Internship']
