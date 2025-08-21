const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

async function fetchJSON(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error('API error: ' + res.status)
  return res.json()
}

export const api = {
  getProfile: () => fetchJSON('/api/profile/'),
  getSkills: () => fetchJSON('/api/skills/'),
  getEducation: () => fetchJSON('/api/education/'),
  getExperience: () => fetchJSON('/api/experience/'),
  getProjects: () => fetchJSON('/api/projects/'),
  getContact: () => fetchJSON('/api/contact/'),
}
