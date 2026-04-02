import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Building2, Plus, Search, Users, BarChart3, Layers3, ArrowRight } from "lucide-react"
import { addCompany, getCompanies } from "../data/companyStore"

const statusStyles = {
  Active: "bg-green-50 text-green-700 border-green-200",
  Trial: "bg-amber-50 text-amber-700 border-amber-200",
  Paused: "bg-gray-50 text-gray-700 border-gray-200",
}

const metricTileBase = "bg-white p-4 rounded-lg shadow-sm border border-gray-100"

export default function Companies() {
  const [companies, setCompanies] = useState([])
  const [query, setQuery] = useState("")
  const [form, setForm] = useState({
    name: "",
    industry: "",
    plan: "Growth",
    status: "Active",
    avgEngagement: 70,
  })

  useEffect(() => {
    setCompanies(getCompanies())
  }, [])

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) {
      return companies
    }

    return companies.filter((company) => {
      return [company.name, company.industry, company.plan, company.status]
        .join(" ")
        .toLowerCase()
        .includes(search)
    })
  }, [companies, query])

  const totals = useMemo(() => {
    const totalCompanies = companies.length
    const totalEmployees = companies.reduce((sum, item) => sum + item.employees.length, 0)
    const totalDepartments = companies.reduce((sum, item) => sum + item.departments.length, 0)
    const avgEngagement =
      totalCompanies > 0
        ? Math.round(companies.reduce((sum, item) => sum + (item.avgEngagement || 0), 0) / totalCompanies)
        : 0

    return { totalCompanies, totalEmployees, totalDepartments, avgEngagement }
  }, [companies])

  const onCreateCompany = () => {
    if (!form.name.trim()) {
      return
    }

    const created = addCompany({
      name: form.name.trim(),
      industry: form.industry.trim(),
      plan: form.plan,
      status: form.status,
      avgEngagement: Number(form.avgEngagement) || 65,
    })

    setCompanies((prev) => [created, ...prev])
    setForm({
      name: "",
      industry: "",
      plan: "Growth",
      status: "Active",
      avgEngagement: 70,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Company Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className={metricTileBase}>
          <p className="text-sm text-gray-500">Total Companies</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totals.totalCompanies}</p>
        </div>
        <div className={metricTileBase}>
          <p className="text-sm text-gray-500">Employees (All Companies)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totals.totalEmployees}</p>
        </div>
        <div className={metricTileBase}>
          <p className="text-sm text-gray-500">Departments Managed</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totals.totalDepartments}</p>
        </div>
        <div className={metricTileBase}>
          <p className="text-sm text-gray-500">Average Engagement</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totals.avgEngagement}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50/40">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search companies by name, industry or plan"
                className="pl-9 pr-4 py-2 border rounded-md w-full sm:w-80 text-sm"
              />
            </div>
            <p className="text-xs text-gray-500">Click Manage to open company details, employees, departments, and analytics.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Industry</th>
                  <th className="px-4 py-3 font-semibold">Plan</th>
                  <th className="px-4 py-3 font-semibold">Departments</th>
                  <th className="px-4 py-3 font-semibold">Employees</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((company) => (
                  <tr key={company.id} className="border-t border-gray-100 hover:bg-gray-50/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#C4963D]/10 text-[#C4963D] flex items-center justify-center">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{company.name}</p>
                          <p className="text-xs text-gray-500">Created {company.createdAt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{company.industry}</td>
                    <td className="px-4 py-3">{company.plan}</td>
                    <td className="px-4 py-3">{company.departments.length}</td>
                    <td className="px-4 py-3">{company.employees.length}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[company.status] || statusStyles.Paused}`}
                      >
                        {company.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/companies/${company.id}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#C4963D] border border-[#C4963D]/30 hover:bg-[#C4963D]/10"
                      >
                        Manage
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No company found for this search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Company</h2>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full border p-2 rounded-md"
              placeholder="Nova Group"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={form.industry}
              onChange={(event) => setForm((prev) => ({ ...prev, industry: event.target.value }))}
              className="w-full border p-2 rounded-md"
              placeholder="Fintech"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Plan</label>
              <select
                value={form.plan}
                onChange={(event) => setForm((prev) => ({ ...prev, plan: event.target.value }))}
                className="w-full border p-2 rounded-md bg-gray-50"
              >
                <option>Starter</option>
                <option>Growth</option>
                <option>Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
                className="w-full border p-2 rounded-md bg-gray-50"
              >
                <option>Active</option>
                <option>Trial</option>
                <option>Paused</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Starting Engagement (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.avgEngagement}
              onChange={(event) => setForm((prev) => ({ ...prev, avgEngagement: event.target.value }))}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <button
            onClick={onCreateCompany}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#C4963D] text-white text-sm font-medium hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Add Company
          </button>

          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              Manage each company employees
            </div>
            <div className="flex items-center gap-2">
              <Layers3 className="w-3.5 h-3.5 text-emerald-600" />
              Configure company departments
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
              View company + overall analytics
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
