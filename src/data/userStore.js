const STORAGE_KEY = "brain-code-admin-users"

const seedUsers = [
  {
    id: "usr-1",
    name: "John Doe",
    email: "john@example.com",
    model: "B2C",
    companyId: null,
    companyName: "Direct Consumer",
    department: "Individual",
    segment: "Premium",
    status: "Active",
    subscription: "Premium",
    dateJoined: "2026-03-25",
    lastActiveAt: "2026-04-02",
    inactiveDays: 0,
    dailyListeningMinutes: 56,
    aiConversationsToday: 2,
    access: {
      categories: ["Sleep", "Meditation"],
      contentTypes: ["Audio", "Video"],
      features: ["AI Mentor", "Programs"],
    },
    assignedPrograms: ["30-Day Sleep Mastery"],
    credentialEmail: {
      sent: true,
      sentAt: "2026-03-25T09:42:00.000Z",
      username: "john@example.com",
      tempPassword: "BC@9031",
    },
  },
  {
    id: "usr-2",
    name: "Fatima Noor",
    email: "fatima.noor@neurolink.com",
    model: "B2B",
    companyId: "cmp-neurolink",
    companyName: "NeuroLink Labs",
    department: "Engineering",
    segment: "Leadership",
    status: "Active",
    subscription: "Company Plan",
    dateJoined: "2026-02-12",
    lastActiveAt: "2026-04-02",
    inactiveDays: 0,
    dailyListeningMinutes: 44,
    aiConversationsToday: 5,
    access: {
      categories: ["Focus", "Energy"],
      contentTypes: ["Audio", "Text"],
      features: ["AI Mentor", "Progress Reports"],
    },
    assignedPrograms: ["5-Day Focus Sprint"],
    credentialEmail: {
      sent: true,
      sentAt: "2026-02-12T08:00:00.000Z",
      username: "fatima.noor@neurolink.com",
      tempPassword: "BC@5213",
    },
  },
  {
    id: "usr-3",
    name: "Hamza Javed",
    email: "hamza.javed@aether.com",
    model: "B2B",
    companyId: "cmp-aether",
    companyName: "Aether Retail Group",
    department: "Store Ops",
    segment: "Field Team",
    status: "Suspended",
    subscription: "Company Plan",
    dateJoined: "2026-01-05",
    lastActiveAt: "2026-03-18",
    inactiveDays: 15,
    dailyListeningMinutes: 12,
    aiConversationsToday: 0,
    access: {
      categories: ["Focus"],
      contentTypes: ["Audio"],
      features: ["Programs"],
    },
    assignedPrograms: ["21-Day Anxiety Reset"],
    credentialEmail: {
      sent: true,
      sentAt: "2026-01-05T10:15:00.000Z",
      username: "hamza.javed@aether.com",
      tempPassword: "BC@1932",
    },
  },
  {
    id: "usr-4",
    name: "Areeba Khan",
    email: "areeba@example.com",
    model: "B2C",
    companyId: null,
    companyName: "Direct Consumer",
    department: "Individual",
    segment: "Free Trial",
    status: "Active",
    subscription: "Trial",
    dateJoined: "2026-03-01",
    lastActiveAt: "2026-03-26",
    inactiveDays: 7,
    dailyListeningMinutes: 28,
    aiConversationsToday: 1,
    access: {
      categories: ["Meditation"],
      contentTypes: ["Audio"],
      features: ["AI Mentor"],
    },
    assignedPrograms: [],
    credentialEmail: {
      sent: true,
      sentAt: "2026-03-01T11:25:00.000Z",
      username: "areeba@example.com",
      tempPassword: "BC@8022",
    },
  },
]

const safeJsonParse = (raw) => {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getUsers() {
  if (typeof window === "undefined") {
    return seedUsers
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  const parsed = raw ? safeJsonParse(raw) : null

  if (!Array.isArray(parsed) || parsed.length === 0) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedUsers))
    return seedUsers
  }

  return parsed
}

export function saveUsers(users) {
  if (typeof window === "undefined") {
    return users
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  return users
}

export function addUser(payload) {
  const users = getUsers()

  const tempPassword = `BC@${Math.floor(1000 + Math.random() * 9000)}`
  const isB2B = payload.model === "B2B"
  const companyName = isB2B ? payload.companyName || "Unassigned Company" : "Direct Consumer"

  const nextUser = {
    id: `usr-${Date.now()}`,
    name: payload.name,
    email: payload.email,
    model: payload.model || "B2C",
    companyId: isB2B ? payload.companyId || null : null,
    companyName,
    department: isB2B ? payload.department || "General" : "Individual",
    segment: payload.segment || (isB2B ? "General" : "Direct"),
    status: "Active",
    subscription: isB2B ? "Company Plan" : "Premium",
    dateJoined: new Date().toISOString().slice(0, 10),
    lastActiveAt: new Date().toISOString().slice(0, 10),
    inactiveDays: 0,
    dailyListeningMinutes: Number(payload.dailyListeningMinutes) || 0,
    aiConversationsToday: Number(payload.aiConversationsToday) || 0,
    access: {
      categories: payload.access?.categories || [],
      contentTypes: payload.access?.contentTypes || [],
      features: payload.access?.features || [],
    },
    assignedPrograms: payload.assignedPrograms || [],
    credentialEmail: {
      sent: Boolean(payload.sendCredentialsEmail),
      sentAt: payload.sendCredentialsEmail ? new Date().toISOString() : null,
      username: payload.email,
      tempPassword,
    },
  }

  saveUsers([nextUser, ...users])
  return nextUser
}

export function updateUserStatus(userId, status) {
  const users = getUsers()
  const updated = users.map((user) => (user.id === userId ? { ...user, status } : user))
  saveUsers(updated)
  return updated
}
