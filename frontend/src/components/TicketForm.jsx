import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send, Sparkles, AlertCircle } from 'lucide-react'
import Button from './Button'
import { fadeInUp, staggerContainer } from '../utils/motion'
import { classifyTicket } from '../utils/helpers'

const TicketForm = ({ onSubmit }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [suggestions, setSuggestions] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const titleValue = watch('title', '')
  const descriptionValue = watch('description', '')

  const analyzeTicked = async () => {
    if (!titleValue || !descriptionValue) return
    
    setIsAnalyzing(true)
    setTimeout(() => {
      const classification = classifyTicket(titleValue, descriptionValue)
      setSuggestions(classification)
      setIsAnalyzing(false)
    }, 1500)
  }

  const onFormSubmit = (data) => {
    const ticketData = {
      ...data,
      status: 'open',
      category: suggestions?.category || data.category,
      priority: suggestions?.priority || data.priority
    }
    onSubmit(ticketData)
    navigate('/')
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="max-w-3xl mx-auto"
    >
      <motion.div variants={fadeInUp} className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-primary p-3 rounded-lg">
            <Send className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Ticket</h1>
            <p className="text-gray-600 text-sm">Submit your support request with details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <motion.div variants={fadeInUp}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Title *
            </label>
            <input
              {...register('title', { required: 'Title is required', minLength: { value: 10, message: 'Title must be at least 10 characters' } })}
              type="text"
              placeholder="Brief description of your issue"
              className={`input-field ${errors.title ? 'input-error' : ''}`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.title.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required', minLength: { value: 20, message: 'Description must be at least 20 characters' } })}
              rows="6"
              placeholder="Provide detailed information about your issue"
              className={`input-field resize-none ${errors.description ? 'input-error' : ''}`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              type="button"
              variant="outline"
              onClick={analyzeTicked}
              disabled={!titleValue || !descriptionValue || isAnalyzing}
              className="w-full mb-4"
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                  </motion.div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get AI Suggestions
                </>
              )}
            </Button>

            {suggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">AI Suggestions</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Suggested Category</p>
                    <span className="badge badge-primary text-sm">{suggestions.category}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Suggested Priority</p>
                    <span className={`badge text-sm ${
                      suggestions.priority === 'critical' ? 'badge-error' :
                      suggestions.priority === 'high' ? 'badge-warning' :
                      'badge-success'
                    }`}>{suggestions.priority}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 italic">{suggestions.reasoning}</p>
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className={`input-field ${errors.category ? 'input-error' : ''}`}
                defaultValue={suggestions?.category || ''}
              >
                <option value="">Select category</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="account">Account</option>
                <option value="other">Other</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority *
              </label>
              <select
                {...register('priority', { required: 'Priority is required' })}
                className={`input-field ${errors.priority ? 'input-error' : ''}`}
                defaultValue={suggestions?.priority || ''}
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              {errors.priority && (
                <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
              )}
            </motion.div>
          </div>

          <motion.div variants={fadeInUp}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Email *
            </label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              placeholder="your.email@example.com"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp} className="flex space-x-4 pt-4">
            <Button type="submit" className="flex-1">
              <Send className="w-5 h-5 mr-2" />
              Submit Ticket
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Cancel
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default TicketForm
