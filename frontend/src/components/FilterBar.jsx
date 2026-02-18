import { motion } from 'framer-motion'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { fadeInUp } from '../utils/motion'

const FilterBar = ({ filters, setFilters, sortBy, setSortBy, totalTickets, filteredCount }) => {
  const categories = ['all', 'technical', 'billing', 'feature', 'bug', 'account', 'other']
  const priorities = ['all', 'low', 'medium', 'high', 'critical']
  const statuses = ['all', 'open', 'in-progress', 'resolved', 'closed']

  return (
    <motion.div variants={fadeInUp} className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900 font-heading">Filter Tickets</h3>
        </div>
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-primary">{filteredCount}</span> of <span className="font-semibold">{totalTickets}</span> tickets
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="input-field pl-10"
          />
        </div>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="input-field"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="input-field"
        >
          {priorities.map(priority => (
            <option key={priority} value={priority}>
              {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="input-field"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Statuses' : status.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-3 pt-2">
        <SlidersHorizontal className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <div className="flex space-x-2">
          {['newest', 'oldest', 'priority'].map(sort => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                sortBy === sort
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FilterBar
