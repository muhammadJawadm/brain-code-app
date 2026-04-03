import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as XLSX from "xlsx"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ArrowLeft, Building2, FileSpreadsheet, FileText, Layers3, Plus, Users } from "lucide-react"
import { getCompanyById, updateCompany } from "../data/companyStore"

const tabs = ["Overview", "Departments", "Employees", "Analytics"]
const colors = ["#C4963D", "#3B82F6", "#10B981", "#F97316", "#EF4444", "#8B5CF6"]

const badgeStyles = {
  Active: "bg-green-50 text-green-700 border-green-200",
  Trial: "bg-amber-50 text-amber-700 border-amber-200",
  Paused: "bg-gray-50 text-gray-700 border-gray-200",
}

export default function CompanyDetail() {
  const { companyId } = useParams()
  const [company, setCompany] = useState(null)
  const [activeTab, setActiveTab] = useState("Overview")
  const [exportScope, setExportScope] = useState("all")

  const [newDepartment, setNewDepartment] = useState({ name: "", head: "", employeeCount: 0 })
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", department: "", status: "Active" })

  useEffect(() => {
    setCompany(getCompanyById(companyId))
  }, [companyId])

  const employeeStatus = useMemo(() => {
    if (!company) {
      return []
    }

    const active = company.employees.filter((item) => item.status === "Active").length
    const inactive = Math.max(company.employees.length - active, 0)

    return [
      { name: "Active", value: active },
      { name: "Inactive", value: inactive },
    ]
  }, [company])

  const saveCompanyChanges = (updater) => {
    if (!company) {
      return
    }

    const updated = updateCompany(company.id, updater)
    setCompany(updated)
  }

  const addDepartment = () => {
    if (!newDepartment.name.trim()) {
      return
    }

    saveCompanyChanges((prev) => ({
      ...prev,
      departments: [
        ...prev.departments,
        {
          id: `dep-${Date.now()}`,
          name: newDepartment.name.trim(),
          head: newDepartment.head.trim() || "TBD",
          employeeCount: Number(newDepartment.employeeCount) || 0,
        },
      ],
    }))

    setNewDepartment({ name: "", head: "", employeeCount: 0 })
  }

  const addEmployee = () => {
    if (!newEmployee.name.trim() || !newEmployee.email.trim()) {
      return
    }

    const preferredDepartment = newEmployee.department || company?.departments[0]?.name || "General"

    saveCompanyChanges((prev) => ({
      ...prev,
      employees: [
        {
          id: `emp-${Date.now()}`,
          name: newEmployee.name.trim(),
          email: newEmployee.email.trim(),
          department: preferredDepartment,
          status: newEmployee.status,
          lastSeen: "Just now",
        },
        ...prev.employees,
      ],
    }))

    setNewEmployee({ name: "", email: "", department: "", status: "Active" })
  }

  const removeEmployee = (employeeId) => {
    saveCompanyChanges((prev) => ({
      ...prev,
      employees: prev.employees.filter((employee) => employee.id !== employeeId),
    }))
  }

  if (!company) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Company not found</h2>
        <p className="text-sm text-gray-500 mt-2">This company may have been removed or never existed in your local dataset.</p>
        <Link
          to="/companies"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-md bg-[#C4963D] text-white text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Companies
        </Link>
      </div>
    )
  }

  const totalEmployees = company.employees.length
  const activeEmployees = company.employees.filter((item) => item.status === "Active").length
  const activeRate = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0

  const analyticsRows = {
    monthlyActivity: company.monthlyActivity.map((item) => ({
      Month: item.name,
      "Active Employees": item.activeEmployees,
    })),
    departmentDistribution: company.departments.map((department) => ({
      Department: department.name,
      "Employee Count": department.employeeCount,
    })),
    statusMix: employeeStatus.map((item) => ({
      Status: item.name,
      Employees: item.value,
    })),
  }

  const getExportBaseName = () => {
    const sanitizedName = company.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    return `${sanitizedName || "company"}-${exportScope}`
  }

  const exportAsExcel = () => {
    const workbook = XLSX.utils.book_new()

    if (exportScope === "all") {
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet([
          {
            Company: company.name,
            Industry: company.industry,
            Plan: company.plan,
            Status: company.status,
            "Created At": company.createdAt,
            "Avg Engagement": `${company.avgEngagement}%`,
            "Total Employees": totalEmployees,
            "Active Employees": activeEmployees,
            "Active Employee Rate": `${activeRate}%`,
            Departments: company.departments.length,
          },
        ]),
        "Overview"
      )
    }

    if (exportScope === "all" || exportScope === "departments") {
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
          company.departments.map((department) => ({
            Name: department.name,
            Head: department.head,
            "Employee Count": department.employeeCount,
          }))
        ),
        "Departments"
      )
    }

    if (exportScope === "all" || exportScope === "employees") {
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(
          company.employees.map((employee) => ({
            Name: employee.name,
            Email: employee.email,
            Department: employee.department,
            Status: employee.status,
            "Last Seen": employee.lastSeen,
          }))
        ),
        "Employees"
      )
    }

    if (exportScope === "all" || exportScope === "analytics") {
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(analyticsRows.monthlyActivity), "Monthly Activity")
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(analyticsRows.departmentDistribution), "Dept Distribution")
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(analyticsRows.statusMix), "Status Mix")
    }

    XLSX.writeFile(workbook, `${getExportBaseName()}.xlsx`)
  }

  const triggerWordDownload = (content) => {
    const blob = new Blob([content], { type: "application/msword;charset=utf-8" })
    const fileUrl = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = fileUrl
    anchor.download = `${getExportBaseName()}.doc`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(fileUrl)
  }

  const exportAsWord = () => {
    const lines = []

    lines.push(`Company Report: ${company.name}`)
    lines.push(`Generated: ${new Date().toLocaleString()}`)
    lines.push("=".repeat(70))
    lines.push("")

    if (exportScope === "all") {
      lines.push("OVERVIEW")
      lines.push(`- Industry: ${company.industry}`)
      lines.push(`- Plan: ${company.plan}`)
      lines.push(`- Status: ${company.status}`)
      lines.push(`- Created At: ${company.createdAt}`)
      lines.push(`- Average Engagement: ${company.avgEngagement}%`)
      lines.push(`- Total Employees: ${totalEmployees}`)
      lines.push(`- Active Employee Rate: ${activeRate}%`)
      lines.push("")
    }

    if (exportScope === "all" || exportScope === "departments") {
      lines.push("DEPARTMENTS")
      company.departments.forEach((department, index) => {
        lines.push(`${index + 1}. ${department.name}`)
        lines.push(`   Head: ${department.head}`)
        lines.push(`   Employee Count: ${department.employeeCount}`)
      })
      lines.push("")
    }

    if (exportScope === "all" || exportScope === "employees") {
      lines.push("EMPLOYEES")
      company.employees.forEach((employee, index) => {
        lines.push(`${index + 1}. ${employee.name} (${employee.status})`)
        lines.push(`   Email: ${employee.email}`)
        lines.push(`   Department: ${employee.department}`)
        lines.push(`   Last Seen: ${employee.lastSeen}`)
      })
      lines.push("")
    }

    if (exportScope === "all" || exportScope === "analytics") {
      lines.push("ANALYTICS")
      lines.push("Monthly Activity:")
      analyticsRows.monthlyActivity.forEach((item) => {
        lines.push(`- ${item.Month}: ${item["Active Employees"]} active employees`)
      })
      lines.push("Department Distribution:")
      analyticsRows.departmentDistribution.forEach((item) => {
        lines.push(`- ${item.Department}: ${item["Employee Count"]} employees`)
      })
      lines.push("Employee Status Mix:")
      analyticsRows.statusMix.forEach((item) => {
        lines.push(`- ${item.Status}: ${item.Employees}`)
      })
      lines.push("")
    }

    triggerWordDownload(lines.join("\n"))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <Link to="/companies" className="inline-flex items-center gap-1 text-sm text-[#C4963D] font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Companies
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#C4963D]/10 text-[#C4963D] flex items-center justify-center">
              <Building2 className="w-4.5 h-4.5" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">{company.name}</h1>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${badgeStyles[company.status] || badgeStyles.Paused}`}>
              {company.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">{company.industry} • {company.plan} Plan • Created {company.createdAt}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Employees</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalEmployees}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Active Employee Rate</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{activeRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Departments</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{company.departments.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Avg Engagement</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{company.avgEngagement}%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#C4963D] text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">Export Data</p>
          <p className="text-xs text-gray-500">Download company data as Excel or Word. Scope includes departments, employees, analytics, or all.</p>
        </div>
        <select
          value={exportScope}
          onChange={(event) => setExportScope(event.target.value)}
          className="border border-gray-200 bg-white rounded-md px-3 py-2 text-sm text-gray-700"
        >
          <option value="all">All Data</option>
          <option value="departments">Departments</option>
          <option value="employees">Employees</option>
          <option value="analytics">Analytics</option>
        </select>
        <button
          onClick={exportAsExcel}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export Excel
        </button>
        <button
          onClick={exportAsWord}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium"
        >
          <FileText className="w-4 h-4" />
          Export Word
        </button>
      </div>

      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Snapshot</h2>
            <div className="space-y-3">
              {company.departments.map((department) => (
                <div key={department.id} className="border rounded-lg p-3 bg-gray-50/50">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-800">{department.name}</p>
                    <span className="text-xs text-gray-500">{department.employeeCount} employees</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Department Head: {department.head}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Health</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">Active Employees</span>
                  <span className="font-semibold text-gray-900">{activeEmployees}/{totalEmployees}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-[#C4963D]" style={{ width: `${activeRate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">Company Engagement</span>
                  <span className="font-semibold text-gray-900">{company.avgEngagement}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${company.avgEngagement}%` }} />
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                This page helps you manage one company end-to-end including department structure, employee records, and performance analytics.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Departments" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Manage Departments</h2>
            <div className="space-y-2">
              {company.departments.map((department) => (
                <div key={department.id} className="rounded-lg border border-gray-100 p-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{department.name}</p>
                    <p className="text-xs text-gray-500">Head: {department.head}</p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                    {department.employeeCount} members
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Layers3 className="w-4 h-4 text-emerald-600" />
              Add Department
            </h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Department Name</label>
              <input
                type="text"
                value={newDepartment.name}
                onChange={(event) => setNewDepartment((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Department Head</label>
              <input
                type="text"
                value={newDepartment.head}
                onChange={(event) => setNewDepartment((prev) => ({ ...prev, head: event.target.value }))}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Employee Count</label>
              <input
                type="number"
                min="0"
                value={newDepartment.employeeCount}
                onChange={(event) => setNewDepartment((prev) => ({ ...prev, employeeCount: event.target.value }))}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <button
              onClick={addDepartment}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#C4963D] text-white text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Save Department
            </button>
          </div>
        </div>
      )}

      {activeTab === "Employees" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Employee Management</h2>
              <span className="text-xs text-gray-500">{company.employees.length} employees</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Department</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Last Seen</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {company.employees.map((employee) => (
                    <tr key={employee.id} className="border-t border-gray-100">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.email}</p>
                      </td>
                      <td className="px-4 py-3">{employee.department}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            employee.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{employee.lastSeen}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeEmployee(employee.id)}
                          className="text-xs text-red-500 hover:text-red-600 font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Add Employee
            </h3>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={newEmployee.name}
                onChange={(event) => setNewEmployee((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newEmployee.email}
                onChange={(event) => setNewEmployee((prev) => ({ ...prev, email: event.target.value }))}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
              <select
                value={newEmployee.department}
                onChange={(event) => setNewEmployee((prev) => ({ ...prev, department: event.target.value }))}
                className="w-full border p-2 rounded-md bg-gray-50"
              >
                <option value="">Select Department</option>
                {company.departments.map((department) => (
                  <option key={department.id} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newEmployee.status}
                onChange={(event) => setNewEmployee((prev) => ({ ...prev, status: event.target.value }))}
                className="w-full border p-2 rounded-md bg-gray-50"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <button
              onClick={addEmployee}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#C4963D] text-white text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Employee
            </button>
          </div>
        </div>
      )}

      {activeTab === "Analytics" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Activity Trend</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={company.monthlyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="activeEmployeesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C4963D" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#C4963D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  <Area type="monotone" dataKey="activeEmployees" stroke="#C4963D" fill="url(#activeEmployeesGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={company.departments} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  <Bar dataKey="employeeCount" radius={[6, 6, 0, 0]}>
                    {company.departments.map((department, index) => (
                      <Cell key={department.id} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 xl:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Status Mix</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={employeeStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={65} outerRadius={110} paddingAngle={4}>
                    {employeeStatus.map((item, index) => (
                      <Cell key={item.name} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Employees"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
