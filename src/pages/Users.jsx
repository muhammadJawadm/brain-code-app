import { useEffect, useMemo, useState } from "react"
import { AlertTriangle, Ban, Filter, Mail, PauseCircle, Plus, Search } from "lucide-react"
import { getCompanies } from "../data/companyStore"
import { addUser, getUsers, updateUserStatus } from "../data/userStore"

const allCategories = ["Focus", "Sleep", "Energy", "Anxiety", "Meditation"]
const allPrograms = ["30-Day Sleep Mastery", "5-Day Focus Sprint", "21-Day Anxiety Reset"]
const allContentTypes = ["Audio", "Video", "Text", "PDF", "Images"]
const allFeatures = ["AI Mentor", "Programs", "Add library", "Mood Tracker", "Offline Mode"]

const statusClasses = {
  Active: "bg-green-100 text-green-800",
  Suspended: "bg-amber-100 text-amber-800",
  Banned: "bg-red-100 text-red-800",
}

const asOptions = (items) =>
  items.map((item) => ({ value: item, label: item }))

const MultiSelectChips = ({ title, options, selected, onChange }) => {
  const handleToggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value))
      return
    }

    onChange([...selected, value])
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{title}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.value)
          return (
            <button
              type="button"
              key={option.value}
              onClick={() => handleToggle(option.value)}
              className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                active
                  ? "bg-[#C4963D]/15 text-[#8A6422] border-[#C4963D]/30"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Users() {
  const [users, setUsers] = useState([])
  const [companies, setCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [modelFilter, setModelFilter] = useState("All")
  const [companyFilter, setCompanyFilter] = useState("All")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [emailAudit, setEmailAudit] = useState([])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    companyId: "",
    department: "",
    categories: [],
    assignedPrograms: [],
    contentTypes: [],
    features: [],
    sendCredentialsEmail: true,
  })

  useEffect(() => {
    setUsers(getUsers())
    setCompanies(getCompanies())
  }, [])

  const companyMap = useMemo(() => {
    return companies.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
  }, [companies])

  const companyDepartments = useMemo(() => {
    if (!newUser.companyId || !companyMap[newUser.companyId]) {
      return []
    }

    return companyMap[newUser.companyId].departments.map((item) => item.name)
  }, [newUser.companyId, companyMap])

  const filterDepartments = useMemo(() => {
    if (companyFilter === "All") {
      return [...new Set(users.filter((item) => item.model === "B2B").map((item) => item.department))]
    }

    return [
      ...new Set(
        users
          .filter((item) => {
            if (companyFilter === "B2C") {
              return item.model === "B2C"
            }

            return item.companyName === companyFilter
          })
          .map((item) => item.department)
      ),
    ]
  }, [users, companyFilter])

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        !term ||
        [user.name, user.email, user.companyName, user.department, user.segment]
          .join(" ")
          .toLowerCase()
          .includes(term)

      const matchesModel = modelFilter === "All" || user.model === modelFilter
      const matchesCompany =
        companyFilter === "All" ||
        (companyFilter === "B2C" ? user.model === "B2C" : user.companyName === companyFilter)
      const matchesDepartment = departmentFilter === "All" || user.department === departmentFilter

      return matchesSearch && matchesModel && matchesCompany && matchesDepartment
    })
  }, [users, searchTerm, modelFilter, companyFilter, departmentFilter])

  const addNewUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      return
    }

    const selectedCompany = companyMap[newUser.companyId]
    const created = addUser({
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      model: newUser.model,
      companyId: newUser.model === "B2B" ? newUser.companyId || null : null,
      companyName: newUser.model === "B2B" ? selectedCompany?.name || "Unassigned Company" : "Direct Consumer",
      department: newUser.model === "B2B" ? newUser.department || "General" : "Individual",
      
      access: {
        categories: newUser.categories,
        contentTypes: newUser.contentTypes,
        features: newUser.features,
      },
      assignedPrograms: newUser.assignedPrograms,
      sendCredentialsEmail: newUser.sendCredentialsEmail,
    })

    setUsers((prev) => [created, ...prev])

    if (created.credentialEmail.sent) {
      setEmailAudit((prev) => [
        {
          id: created.id,
          to: created.email,
          sentAt: created.credentialEmail.sentAt,
          password: created.credentialEmail.tempPassword,
        },
        ...prev,
      ])
    }

    setNewUser({
      name: "",
      email: "",
      companyId: "",
      department: "",
      categories: [],
      assignedPrograms: [],
      contentTypes: [],
      features: [],
      sendCredentialsEmail: true,
    })
  }

  const setUserStatus = (userId, status) => {
    const updated = updateUserStatus(userId, status)
    setUsers(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">User & Account Management</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 border-b bg-gray-50/50 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, company, department..."
                  className="pl-9 pr-4 py-2 border rounded-md w-80 max-w-full text-sm"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                B2B and B2C users managed together
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <select value={modelFilter} onChange={(event) => setModelFilter(event.target.value)} className="border rounded-md p-2 text-sm bg-white">
                <option value="All">All Models</option>
                <option value="B2C">B2C</option>
                <option value="B2B">B2B</option>
              </select>

              <select value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)} className="border rounded-md p-2 text-sm bg-white">
                <option value="All">All Companies</option>
                <option value="B2C">Direct Consumer (B2C)</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>

              <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)} className="border rounded-md p-2 text-sm bg-white">
                <option value="All">All Departments / Segments</option>
                {filterDepartments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-medium">User Details</th>
                  <th className="px-4 py-3 font-medium">Company / Segment</th>
                  <th className="px-4 py-3 font-medium">Access</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date Joined</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-gray-500 text-xs">{user.email}</div>
                      <div className="text-[11px] mt-1 text-gray-500">{user.model}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-800">{user.companyName}</div>
                      <div className="text-xs text-gray-500">{user.department} / {user.segment}</div>
                    </td>
                    <td className="px-4 py-4 max-w-[260px]">
                      <div className="text-xs text-gray-500">
                        Categories: {user.access.categories.join(", ") || "-"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Programs: {user.assignedPrograms.join(", ") || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusClasses[user.status] || "bg-gray-100 text-gray-700"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">{user.dateJoined}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setUserStatus(user.id, "Active")}
                          className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700 transition-colors"
                          title="Warn User"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-xs font-medium">Warn</span>
                        </button>
                        <button
                          onClick={() => setUserStatus(user.id, "Suspended")}
                          className="flex items-center space-x-1 text-orange-500 hover:text-orange-600 transition-colors"
                          title="Suspend User"
                        >
                          <PauseCircle className="h-4 w-4" />
                          <span className="text-xs font-medium">Suspend</span>
                        </button>
                        <button
                          onClick={() => setUserStatus(user.id, "Banned")}
                          className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                          title="Ban User"
                        >
                          <Ban className="h-4 w-4" />
                          <span className="text-xs font-medium">Ban</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No users found for this filter combination.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New User</h2>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(event) => setNewUser((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(event) => setNewUser((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
       <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={newUser.company}
              onChange={(event) => setNewUser((prev) => ({ ...prev, company: event.target.value }))}
              className="w-full border p-2 rounded-md"
            />
          </div>
            <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              value={newUser.department}
              onChange={(event) => setNewUser((prev) => ({ ...prev, department: event.target.value }))}
              className="w-full border p-2 rounded-md"
            />
          </div>
          </div>

          {newUser.model === "B2B" && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                <select
                  value={newUser.companyId}
                  onChange={(event) => setNewUser((prev) => ({ ...prev, companyId: event.target.value, department: "" }))}
                  className="w-full border p-2 rounded-md bg-gray-50"
                >
                  <option value="">Select company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={newUser.department}
                  onChange={(event) => setNewUser((prev) => ({ ...prev, department: event.target.value }))}
                  className="w-full border p-2 rounded-md bg-gray-50"
                >
                  <option value="">Select department</option>
                  {companyDepartments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <MultiSelectChips
            title="Category Access"
            options={asOptions(allCategories)}
            selected={newUser.categories}
            onChange={(value) => setNewUser((prev) => ({ ...prev, categories: value }))}
          />

          <MultiSelectChips
            title="Assigned Programs"
            options={asOptions(allPrograms)}
            selected={newUser.assignedPrograms}
            onChange={(value) => setNewUser((prev) => ({ ...prev, assignedPrograms: value }))}
          />

          <MultiSelectChips
            title="Content Type Access"
            options={asOptions(allContentTypes)}
            selected={newUser.contentTypes}
            onChange={(value) => setNewUser((prev) => ({ ...prev, contentTypes: value }))}
          />

          <MultiSelectChips
            title="Feature Access"
            options={asOptions(allFeatures)}
            selected={newUser.features}
            onChange={(value) => setNewUser((prev) => ({ ...prev, features: value }))}
          />

          <label className="flex items-center gap-2 text-xs text-gray-700">
            <input
              type="checkbox"
              checked={newUser.sendCredentialsEmail}
              onChange={(event) => setNewUser((prev) => ({ ...prev, sendCredentialsEmail: event.target.checked }))}
            />
            Automatically email login credentials
          </label>

          <button
            onClick={addNewUser}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#C4963D] text-white text-sm font-medium hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Create User
          </button>

          {emailAudit.length > 0 && (
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Latest Credential Emails
              </p>
              <div className="space-y-2 max-h-28 overflow-auto pr-1">
                {emailAudit.slice(0, 3).map((emailLog) => (
                  <div key={emailLog.id} className="text-[11px] text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-100">
                    Sent to {emailLog.to} at {new Date(emailLog.sentAt).toLocaleString()}<br />
                    Temp Password: <span className="font-semibold text-gray-800">{emailLog.password}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}