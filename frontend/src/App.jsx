import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import StatsPanel from './components/StatsPanel'
import { tickets as initialTickets } from './data/mockData'

const App = () => {
  const [tickets, setTickets] = useState(initialTickets)
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priority: 'all',
    status: 'all'
  })

  const addTicket = (newTicket) => {
    const ticket = {
      ...newTicket,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: null,
      comments: []
    }
    setTickets(prev => [ticket, ...prev])
  }

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() }
        : ticket
    ))
  }

  const deleteTicket = (ticketId) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== ticketId))
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(filters.search.toLowerCase())
    const matchesCategory = filters.category === 'all' || ticket.category === filters.category
    const matchesPriority = filters.priority === 'all' || ticket.priority === filters.priority
    const matchesStatus = filters.status === 'all' || ticket.status === filters.status
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <StatsPanel tickets={tickets} />
                <TicketList 
                  tickets={filteredTickets}
                  filters={filters}
                  setFilters={setFilters}
                  updateTicketStatus={updateTicketStatus}
                  deleteTicket={deleteTicket}
                />
              </div>
            } />
            <Route path="/new-ticket" element={
              <TicketForm onSubmit={addTicket} />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
