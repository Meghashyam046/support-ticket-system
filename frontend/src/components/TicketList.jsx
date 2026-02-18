import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import TicketCard from './TicketCard'
import FilterBar from './FilterBar'
import { Inbox } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/motion'

const TicketList = ({ tickets, filters, setFilters, updateTicketStatus, deleteTicket }) => {
  const [sortBy, setSortBy] = useState('newest')

  const sortedTickets = [...tickets].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'priority':
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      default:
        return 0
    }
  })

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <FilterBar 
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalTickets={tickets.length}
          filteredCount={sortedTickets.length}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        {sortedTickets.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Inbox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-600">
              {tickets.length === 0 
                ? 'Create your first support ticket to get started'
                : 'Try adjusting your filters to see more results'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {sortedTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TicketCard
                    ticket={ticket}
                    updateTicketStatus={updateTicketStatus}
                    deleteTicket={deleteTicket}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default TicketList
