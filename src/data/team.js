// Shared team data — used by About.jsx and BlogPost.jsx
export const team = [
  {
    name:  "Ian Otieno",
    role:  "Founder & CEO",
    image: "/images/about/team-1.jpg",
  },
  {
    name:  "Latifa Clay",
    role:  "Head of Design",
    image: "/images/about/team-2.jpg",
  },
  {
    name:  "Daniel Kiu",
    role:  "Operations Lead",
    image: "/images/about/team-3.jpg",
  },
  {
    name:  "Momanyi Kelvin",
    role:  "System Administrator",
    image: "/images/about/team-4.jpg",
  },
]

// Helper — find a team member by name
// Usage: getAuthor("Ian Otieno") → { name, role, image }
export function getAuthor(name) {
  return team.find((m) => m.name === name) || {
    name,
    role:  "Writer",
    image: "/images/placeholder.jpg",
  }
}