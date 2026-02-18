import { motion } from 'framer-motion'
import { useState } from 'react'
import { Clock, User, Tag, AlertCircle, CheckCircle2, XCircle, Trash2, MoreVertical } from 'lucide-react'
import Badge from './Badge'
import Button from './Button'
import { formatDate } from '../utils/helpers'

const TicketCard = ({ ticket, updateTicketStatus, deleteTicket }) => {
  const [showActions, setShowActions] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const statusConfig = {
    open: { icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Open' },
    'in-progress': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'In Progress' },
    resolved: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', label: 'Resolved' },
    closed: { icon: XCircle, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Closed' },
  }

  const priorityColors = {
    low: 'badge-success',
    medium: 'badge-primary',
    high: 'badge-warning',
    critical: 'badge-error',
  }

  const currentStatus = statusConfig[ticket.status]
  const StatusIcon = currentStatus.icon

  const handleStatusChange = (newStatus) => {
    updateTicketStatus(ticket.id, newStatus)
    setShowActions(false)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      deleteTicket(ticket.id)
    }, 300)
  }

  return (
    <motion.div
      layout
      animate={{ opacity: isDeleting ? 0 : 1, scale: isDeleting ? 0.95 : 1 }}
      className="glass-card p-6 hover:shadow-xl transition-all duration-300 relative"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">
              {ticket.title}
            </h3>
            <Badge variant={priorityColors[ticket.priority]} className="uppercase text-xs">
              {ticket.priority}
            </Badge>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {ticket.description}
          </p>
        </div>

        <div className="relative ml-4">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10"
            >
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Change Status</div>
              {Object.entries(statusConfig).map(([status, config]) => {
                const Icon = config.icon
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                    disabled={ticket.status === status}
                  >
                    <Icon className={`w-4 h-4 ${config.color}`} />
                    <span className={ticket.status === status ? 'font-semibold' : ''}>
                      {config.label}
                    </span>
                  </button>
                )
              })}
              <div className="border-t border-gray-200 my-2" />
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-2 text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Ticket</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4" />
          <span className="capitalize">{ticket.category}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>{ticket.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{formatDate(ticket.createdAt)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${currentStatus.bg}`}>
            <StatusIcon className={`w-4 h-4 ${currentStatus.color}`} />
            <span className={`text-sm font-medium ${currentStatus.color}`}>
              {currentStatus.label}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            ID: #{ticket.id}
          </span>
        </div>
      </div>

      {showActions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowActions(false)}
        />
      )}
    </motion.div>
  )
}

export default TicketCard
