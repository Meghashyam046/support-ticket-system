import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Ticket, LayoutDashboard, Plus } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/new-ticket', label: 'New Ticket', icon: Plus },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-primary p-2 rounded-lg"
            >
              <Ticket className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 font-heading">Support Desk</span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <div className={`flex items-center space-x-2 ${
                    isActive ? 'text-primary' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
