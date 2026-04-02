const STORAGE_KEY = "brain-code-admin-companies"

const seededCompanies = [
  {
    id: "cmp-neurolink",
    name: "NeuroLink Labs",
    industry: "HealthTech",
    plan: "Enterprise",
    status: "Active",
    createdAt: "2025-09-21",
    avgEngagement: 86,
    monthlyActivity: [
      { name: "Jan", activeEmployees: 62, sessions: 410 },
      { name: "Feb", activeEmployees: 68, sessions: 452 },
      { name: "Mar", activeEmployees: 71, sessions: 479 },
      { name: "Apr", activeEmployees: 74, sessions: 503 },
      { name: "May", activeEmployees: 76, sessions: 520 },
      { name: "Jun", activeEmployees: 82, sessions: 568 },
    ],
    departments: [
      { id: "dep-nl-1", name: "Engineering", head: "Ayesha Malik", employeeCount: 38 },
      { id: "dep-nl-2", name: "Operations", head: "Yasir Khan", employeeCount: 17 },
      { id: "dep-nl-3", name: "HR", head: "Maria Saeed", employeeCount: 11 },
      { id: "dep-nl-4", name: "Sales", head: "Asad Farooq", employeeCount: 15 },
    ],
    employees: [
      { id: "emp-nl-1", name: "Fatima Noor", email: "fatima.noor@neurolink.com", department: "Engineering", status: "Active", lastSeen: "2h ago" },
      { id: "emp-nl-2", name: "Ali Raza", email: "ali.raza@neurolink.com", department: "Operations", status: "Active", lastSeen: "4h ago" },
      { id: "emp-nl-3", name: "Saad Tariq", email: "saad.tariq@neurolink.com", department: "Sales", status: "Inactive", lastSeen: "6d ago" },
      { id: "emp-nl-4", name: "Nida Ahmad", email: "nida.ahmad@neurolink.com", department: "HR", status: "Active", lastSeen: "1d ago" },
    ],
  },
  {
    id: "cmp-aether",
    name: "Aether Retail Group",
    industry: "Retail",
    plan: "Growth",
    status: "Active",
    createdAt: "2025-12-02",
    avgEngagement: 73,
    monthlyActivity: [
      { name: "Jan", activeEmployees: 39, sessions: 240 },
      { name: "Feb", activeEmployees: 42, sessions: 261 },
      { name: "Mar", activeEmployees: 44, sessions: 272 },
      { name: "Apr", activeEmployees: 47, sessions: 289 },
      { name: "May", activeEmployees: 50, sessions: 305 },
      { name: "Jun", activeEmployees: 53, sessions: 328 },
    ],
    departments: [
      { id: "dep-ar-1", name: "Store Ops", head: "Hina Karim", employeeCount: 29 },
      { id: "dep-ar-2", name: "Marketing", head: "Bilal Nadeem", employeeCount: 12 },
      { id: "dep-ar-3", name: "Finance", head: "Saira Ahmed", employeeCount: 8 },
    ],
    employees: [
      { id: "emp-ar-1", name: "Hamza Javed", email: "hamza.javed@aether.com", department: "Store Ops", status: "Active", lastSeen: "5h ago" },
      { id: "emp-ar-2", name: "Aqsa Irfan", email: "aqsa.irfan@aether.com", department: "Marketing", status: "Active", lastSeen: "7h ago" },
      { id: "emp-ar-3", name: "Usman Yousaf", email: "usman.yousaf@aether.com", department: "Finance", status: "Active", lastSeen: "1d ago" },
    ],
  },
  {
    id: "cmp-catalyst",
    name: "Catalyst Systems",
    industry: "SaaS",
    plan: "Starter",
    status: "Trial",
    createdAt: "2026-01-14",
    avgEngagement: 61,
    monthlyActivity: [
      { name: "Jan", activeEmployees: 17, sessions: 88 },
      { name: "Feb", activeEmployees: 19, sessions: 94 },
      { name: "Mar", activeEmployees: 22, sessions: 102 },
      { name: "Apr", activeEmployees: 24, sessions: 108 },
      { name: "May", activeEmployees: 26, sessions: 112 },
      { name: "Jun", activeEmployees: 28, sessions: 121 },
    ],
    departments: [
      { id: "dep-cs-1", name: "Product", head: "Hassan Ali", employeeCount: 13 },
      { id: "dep-cs-2", name: "Customer Success", head: "Saba Khan", employeeCount: 9 },
      { id: "dep-cs-3", name: "Support", head: "Muneeb Rauf", employeeCount: 6 },
    ],
    employees: [
      { id: "emp-cs-1", name: "Rania Noor", email: "rania.noor@catalyst.io", department: "Product", status: "Active", lastSeen: "9h ago" },
      { id: "emp-cs-2", name: "Khizar Moin", email: "khizar.moin@catalyst.io", department: "Support", status: "Inactive", lastSeen: "3d ago" },
    ],
  },
]

const toString = (value) => JSON.stringify(value)

const fromString = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export function getCompanies() {
  if (typeof window === "undefined") {
    return seededCompanies
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  const parsed = raw ? fromString(raw) : null

  if (!Array.isArray(parsed) || parsed.length === 0) {
    window.localStorage.setItem(STORAGE_KEY, toString(seededCompanies))
    return seededCompanies
  }

  return parsed
}

export function saveCompanies(companies) {
  if (typeof window === "undefined") {
    return companies
  }

  window.localStorage.setItem(STORAGE_KEY, toString(companies))
  return companies
}

export function getCompanyById(companyId) {
  return getCompanies().find((company) => company.id === companyId)
}

export function addCompany(payload) {
  const base = getCompanies()
  const nextCompany = {
    id: `cmp-${Date.now()}`,
    name: payload.name,
    industry: payload.industry || "General",
    plan: payload.plan || "Starter",
    status: payload.status || "Active",
    createdAt: new Date().toISOString().slice(0, 10),
    avgEngagement: Number(payload.avgEngagement) || 60,
    monthlyActivity: [
      { name: "Jan", activeEmployees: 0, sessions: 0 },
      { name: "Feb", activeEmployees: 0, sessions: 0 },
      { name: "Mar", activeEmployees: 0, sessions: 0 },
      { name: "Apr", activeEmployees: 0, sessions: 0 },
      { name: "May", activeEmployees: 0, sessions: 0 },
      { name: "Jun", activeEmployees: 0, sessions: 0 },
    ],
    departments: [],
    employees: [],
  }

  saveCompanies([nextCompany, ...base])
  return nextCompany
}

export function updateCompany(companyId, updater) {
  const companies = getCompanies()
  const updated = companies.map((company) => {
    if (company.id !== companyId) {
      return company
    }

    return typeof updater === "function" ? updater(company) : { ...company, ...updater }
  })

  saveCompanies(updated)
  return updated.find((company) => company.id === companyId)
}
